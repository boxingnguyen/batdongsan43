"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Car, MapPin, X } from "lucide-react";
// Static import is safe: MapPanel is only ever mounted client-side by the chat
// panel (next/dynamic with ssr: false), so maplibre never loads during SSR.
import { LngLatBounds, Map as MaplibreMap, Marker, Popup } from "maplibre-gl";
import type { NearbyPlace } from "@/lib/chat/contracts";
import { cn } from "@/lib/utils";
import {
  createDirectionsFlow,
  type DirectionsFlow,
  type LineStringGeometry,
  type RouteDirections,
} from "./routeDirections";
import {
  MAP_TILE_URL,
  attributionForTileUrl,
  createTileFailureTracker,
  expandTileUrls,
  isTileFetchError,
} from "./mapTiles";
// Required for maplibre markers (position: absolute, anchoring) and controls.
// Without it markers render as static elements that stretch the canvas container.
import "maplibre-gl/dist/maplibre-gl.css";

const GOLD = "#C9A45D";
const NAVY = "#16384C";

// Stable ids for the client-side route overlay so a new route can replace the
// previous polyline without leaking layers.
const ROUTE_SOURCE_ID = "directions-route";
const ROUTE_LAYER_ID = "directions-route-line";

function fmtDistance(m?: number): string {
  if (m === undefined || m === null || Number.isNaN(m)) return "";
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}

/** Pinned props for the chat map panel. */
export interface MapPanelProps {
  center: { lat: number; lng: number };
  zoom: number;
  places: NearbyPlace[];
  className?: string;
}

export function MapPanel({ center, zoom, places, className }: MapPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const markersRef = useRef<{ remove: () => void }[]>([]);
  const popupRef = useRef<Popup | null>(null);
  // Place marker pills by key so selection emphasis restyles in place
  // (no full marker rebuild) when the selection changes.
  const markerElsRef = useRef<Record<string, HTMLButtonElement>>({});
  // A route approved before the map style finished loading is drawn as soon
  // as the style is ready instead of being silently dropped.
  const pendingRouteRef = useRef<LineStringGeometry | null>(null);
  // drawRouteLine is recreated when center changes, but the map "load"
  // handler is registered once: it goes through this ref to always call the
  // current closure.
  const drawRouteRef = useRef<(geometry: LineStringGeometry) => void>(() => {});
  // Initial camera seed, captured once so the map instance is built exactly
  // one time; later center/zoom changes go through the recenter effect.
  const seedRef = useRef({ center, zoom });
  // Flips true when the map style has loaded; the marker effect uses it as a
  // real guard so markers are (re)built exactly when drawing is possible.
  const [styleReady, setStyleReady] = useState(false);
  // Latched when repeated tile fetch failures prove the basemap CDN is
  // unreachable; swaps the blank gray canvas for a fallback panel.
  const [tilesFailed, setTilesFailed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  // Consent-first directions: the popup opens before any geolocation call,
  // and the resolved location never leaves this component.
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [directionsBusy, setDirectionsBusy] = useState(false);
  const [routeBadge, setRouteBadge] = useState<RouteDirections | null>(null);
  const activeDirectionsRef = useRef<DirectionsFlow | null>(null);

  const sorted = useMemo(
    () => [...places].sort((a, b) => (a.distance_m ?? Infinity) - (b.distance_m ?? Infinity)),
    [places]
  );

  const removeRouteOverlay = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer(ROUTE_LAYER_ID)) map.removeLayer(ROUTE_LAYER_ID);
    if (map.getSource(ROUTE_SOURCE_ID)) map.removeSource(ROUTE_SOURCE_ID);
  }, []);

  const drawRouteLine = useCallback(
    (geometry: LineStringGeometry) => {
      const map = mapRef.current;
      if (!map) return;
      removeRouteOverlay();
      map.addSource(ROUTE_SOURCE_ID, {
        type: "geojson",
        data: geometry as unknown as GeoJSON.GeoJSON,
      });
      map.addLayer({
        id: ROUTE_LAYER_ID,
        type: "line",
        source: ROUTE_SOURCE_ID,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": NAVY, "line-width": 5, "line-opacity": 0.9 },
      });
      const [firstLng, firstLat] = geometry.coordinates[0];
      const bounds = new LngLatBounds([firstLng, firstLat], [firstLng, firstLat]);
      geometry.coordinates.forEach(([lng, lat]) => bounds.extend([lng, lat]));
      bounds.extend([center.lng, center.lat]);
      map.fitBounds(bounds, { padding: 48, duration: 700 });
    },
    [center.lng, center.lat, removeRouteOverlay]
  );
  drawRouteRef.current = drawRouteLine;

  /* Build the Map exactly once (client-only component; static import above). */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;
    setTilesFailed(false);
    const tracker = createTileFailureTracker();
    const map = new MaplibreMap({
      container: el,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: expandTileUrls(MAP_TILE_URL),
            tileSize: 256,
            attribution: attributionForTileUrl(MAP_TILE_URL),
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      center: [seedRef.current.center.lng, seedRef.current.center.lat],
      zoom: seedRef.current.zoom,
    });
    mapRef.current = map;
    // Offline / blocked tile CDN: every failed request surfaces as an
    // "error" event; past the threshold the fallback panel replaces the
    // permanently gray canvas.
    map.on("error", (event: unknown) => {
      if (!isTileFetchError(event)) return;
      if (tracker.record()) setTilesFailed(true);
    });
    map.on("load", () => {
      setStyleReady(true);
      if (pendingRouteRef.current) {
        drawRouteRef.current(pendingRouteRef.current);
        pendingRouteRef.current = null;
      }
    });
    // Layout settles after mount (hydration stretch, tab exposure): resize
    // the map whenever the container's box actually changes, and stop the
    // observer before map.remove() so late frames cannot touch a dead map.
    const ro = new ResizeObserver(() => {
      if (mapRef.current) map.resize();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      setStyleReady(false);
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
      markerElsRef.current = {};
      popupRef.current = null;
      setRouteBadge(null);
      pendingRouteRef.current = null;
    };
  }, []);

  /* Recenter when the center prop changes; clear popup + route of the
     previous view so nothing stale survives the camera move. Markers are
     owned exclusively by the marker effect below and survive the camera
     move (the places did not change). */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }
    removeRouteOverlay();
    setRouteBadge(null);
    map.flyTo({ center: [center.lng, center.lat], zoom, duration: 800 });
  }, [center, zoom, removeRouteOverlay]);

  /* Popup on marker click: name / address / rating + consent-first
     "Chỉ đường" CTA routing to that place. closeOnClick stays false (as in
     the source) so a click on another marker can never close the popup that
     the marker's own handler is about to open. */
  const openPopup = useCallback((p: NearbyPlace) => {
    const map = mapRef.current;
    if (!map) return;
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }
    const body = document.createElement("div");
    body.style.cssText = "min-width:180px;";
    const name = document.createElement("div");
    name.textContent = p.name;
    name.style.cssText = `font-size:14px;font-weight:700;color:${NAVY};line-height:1.35;`;
    body.appendChild(name);
    if (p.address) {
      const address = document.createElement("div");
      address.textContent = p.address;
      address.style.cssText = "font-size:12px;color:rgba(22,56,76,.65);margin-top:2px;";
      body.appendChild(address);
    }
    const meta = document.createElement("div");
    const metaBits = [p.kinds[0] ?? "Tiện ích", fmtDistance(p.distance_m)];
    if (p.rating !== undefined && p.rating !== null) metaBits.push(`★ ${p.rating}`);
    meta.textContent = metaBits.filter(Boolean).join(" · ");
    meta.style.cssText = "font-size:12px;color:rgba(22,56,76,.65);margin:4px 0 10px;";
    body.appendChild(meta);
    const cta = document.createElement("button");
    cta.type = "button";
    cta.textContent = "Chỉ đường";
    // Consent-first: only opens the location popup; geolocation and routing
    // happen after the visitor agrees.
    cta.addEventListener("click", () => requestDirections(p));
    cta.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:36px;background:${GOLD};color:${NAVY};border-radius:6px;border:none;font-size:13px;font-weight:600;cursor:pointer;`;
    body.appendChild(cta);
    popupRef.current = new Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 18,
      maxWidth: "280px",
    })
      .setLngLat([p.lng, p.lat])
      .setDOMContent(body)
      .addTo(map);
  }, []);

  /* Rebuild markers when the place set changes or the style becomes ready.
     Owner of the full marker lifecycle: no other effect removes markers. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady || !map.isStyleLoaded()) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    markerElsRef.current = {};

    sorted.forEach((p, i) => {
      const key = `${p.name}#${i}`;
      // Place marker: gold pill with navy text — one element per place.
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", `${p.name}${p.rating ? ` - ${p.rating}` : ""}`);
      el.title = p.name;
      el.style.cssText = `display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:9999px;background:${GOLD};color:${NAVY};font-size:11px;font-weight:700;letter-spacing:.02em;border:2px solid #fff;box-shadow:0 1px 3px rgba(22,56,76,.25);cursor:pointer;white-space:nowrap;transition:transform .15s ease, box-shadow .15s ease;font-family:inherit;`;
      el.textContent = p.name;
      el.addEventListener("click", () => {
        setSelectedKey(key);
        openPopup(p);
      });
      markerElsRef.current[key] = el;
      markersRef.current.push(new Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map));
    });
  }, [sorted, styleReady, openPopup]);

  /* Selected place emphasis: restyle pills in place (bigger, gold glow). */
  useEffect(() => {
    if (!styleReady) return;
    for (const [key, el] of Object.entries(markerElsRef.current)) {
      const sel = key === selectedKey;
      el.style.transform = sel ? "scale(1.12)" : "scale(1)";
      el.style.boxShadow = sel ? "0 2px 10px rgba(201,164,93,.6)" : "0 1px 3px rgba(22,56,76,.25)";
    }
  }, [selectedKey, styleReady]);

  // "Get directions" always goes through the permission popup first. The flow is
  // created lazily on the click so SSR/static render never touches navigator.
  function requestDirections(destination: { lat: number; lng: number }) {
    const flow = createDirectionsFlow(destination, {
      geolocation: typeof navigator !== "undefined" ? navigator.geolocation : undefined,
    });
    activeDirectionsRef.current = flow;
    flow.begin();
    setDirectionsOpen(true);
  }

  // User accepted: resolve the location, then draw the OSRM route or fall back
  // to the Google Maps deep-link when the location/route is unavailable.
  async function approveDirections() {
    const flow = activeDirectionsRef.current;
    if (!flow) return;
    setDirectionsBusy(true);
    try {
      const outcome = await flow.confirm();
      if (outcome.status === "route") {
        setRouteBadge(outcome);
        const map = mapRef.current;
        if (map && map.isStyleLoaded()) {
          drawRouteLine(outcome.geometry);
        } else {
          pendingRouteRef.current = outcome.geometry;
        }
      } else {
        clearRoute();
        window.open(outcome.url, "_blank", "noopener,noreferrer");
      }
    } finally {
      setDirectionsBusy(false);
      setDirectionsOpen(false);
    }
  }

  // User dismissed the popup (ESC / backdrop / close X): close ONLY. Never
  // trigger the deep-link fallback from a dismiss — closing a popup must not
  // open a new tab.
  function dismissDirections() {
    setDirectionsOpen(false);
  }

  // User explicitly declined: an active decline keeps the deep-link
  // behaviour (no origin coordinate, so no location is requested or shared).
  function declineDirections() {
    const flow = activeDirectionsRef.current;
    if (flow) {
      const outcome = flow.cancel();
      if (outcome.status === "fallback") {
        window.open(outcome.url, "_blank", "noopener,noreferrer");
      }
    }
    setDirectionsOpen(false);
  }

  function clearRoute() {
    removeRouteOverlay();
    setRouteBadge(null);
  }
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded border border-[#E8E5DF] bg-white",
        className
      )}
    >
      <div className="relative min-h-0 flex-1">
        <div
          ref={containerRef}
          className="h-full w-full"
          style={{ filter: "saturate(0.85) contrast(1.02)" }}
        />
        {tilesFailed && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-2 bg-[#F8F7F3] p-4 text-center"
          >
            <MapPin aria-hidden="true" className="h-8 w-8 text-[#16384C]" />
            <p className="font-serif text-[17px] font-semibold text-[#16384C]">
              Bản đồ tạm thời không tải được
            </p>
            <p className="max-w-[420px] text-[13px] text-[#16384C]/60">
              Không kết nối được máy chủ bản đồ từ thiết bị này. Vui lòng thử lại sau.
            </p>
          </div>
        )}
        {routeBadge && (
          <div className="absolute right-3 top-3 z-[2] flex items-center gap-2.5 rounded-md border border-[#16384C] bg-white px-3.5 py-2 shadow-sm">
            <Car aria-hidden="true" className="h-5 w-5 text-[#16384C]" />
            <div>
              <div className="text-[14px] font-bold text-[#16384C]">{routeBadge.statsLabel}</div>
              <div className="text-[12px] text-[#16384C]/60">Đường đi dự kiến</div>
            </div>
          </div>
        )}
      </div>

      {/* Permission popup: explains why the location is needed and that it
          stays on the device before any geolocation call is made. */}
      {directionsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#16384C]/50" onClick={dismissDirections} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cho phép lấy vị trí của bạn?"
            className="relative z-[1] w-full max-w-md rounded-lg border border-[#E8E5DF] bg-white p-6 shadow-xl"
          >
            <button
              type="button"
              aria-label="Đóng"
              onClick={dismissDirections}
              className="absolute right-3 top-3 rounded p-1 text-[#16384C]/50 transition-colors hover:bg-[#F8F7F3] hover:text-[#16384C]"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
            <h3 className="font-serif text-lg font-semibold text-[#16384C]">
              Cho phép lấy vị trí của bạn?
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[#16384C]">
              Để vẽ đường đi từ vị trí hiện tại của bạn đến điểm tiện ích trên bản đồ, ứng dụng
              cần biết vị trí của bạn.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#16384C]/60">
              Vị trí chỉ được sử dụng ngay trên máy này để tính đường đi, không được gửi đến máy
              chủ và không được lưu lại sau khi đóng trang.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={declineDirections}
                disabled={directionsBusy}
                className="h-10 rounded border border-[#E8E5DF] px-4 text-[14px] font-semibold text-[#16384C] transition-colors hover:bg-[#F8F7F3] disabled:opacity-50"
              >
                Không
              </button>
              <button
                type="button"
                onClick={approveDirections}
                disabled={directionsBusy}
                className="h-10 rounded bg-[#16384C] px-4 text-[14px] font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {directionsBusy ? "Đang tính đường..." : "Đồng ý"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
