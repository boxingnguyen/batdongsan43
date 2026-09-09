"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Video as VideoIcon, Volume2 } from "lucide-react";
import type { Image as ImageContract, Video } from "@/lib/chat/contracts";
import { ImageGallery } from "./ImageGallery";
import { filterPublicImages, filterPublicVideos } from "@/lib/chat/mediaPolicy";
import { cn } from "@/lib/utils";

interface GreetingMediaProps {
  videos?: Video[];
  images?: ImageContract[];
  /** Whether the greeting text has finished streaming (media fades in after it). */
  ready?: boolean;
  /** Page-level lightbox hook; absent → ImageGallery's inline portal lightbox. */
  onImageClick?: (src: string) => void;
}

/**
 * Bridge copy between the film and the sheets: a short sales line that keeps
 * momentum while separating the two media blocks visually. Inlined here
 * (single-project port; the source's greetingContent module is not ported).
 */
const GREETING_MID_TEXT =
  "Khám phá thêm không gian sống qua hình ảnh và thước phim thực tế của dự án bên dưới.";

/**
 * Welcome-screen media block: a cinematic brand/drone film hero followed by the
 * project image gallery. Rendered inside the first assistant message. Each half
 * is optional (videos?.length / images?.length guards) so the component stays
 * defensive while the backend still lands the `videos` payload.
 *
 * All URLs pass the media allowlist first; anything rejected or failed degrades
 * silently to the text-only greeting (public media is never replaced with
 * fabricated content — text remains the source of truth).
 *
 * Video behavior — autoplay muted playsInline (no loop: it freezes on the last
 * frame when ended) so the hero reads as a live brand film on open (mobile-safe).
 */
export function GreetingMedia({ videos, images, ready = true, onImageClick }: GreetingMediaProps) {
  // The backend may return several tapes sharing one kind (two `brand` films, a
  // web build plus the original). Dedupe to exactly one film per kind so the
  // tab picker never shows duplicated labels.
  const publicVideos = filterPublicVideos(videos);
  const heroVideos = pickHeroVideos(publicVideos);
  const publicImages = filterPublicImages(images);
  const showVideo = heroVideos.length > 0;
  const showImages = publicImages.length > 0;
  const hasRejectedMedia =
    (Array.isArray(videos) && videos.length > 0 && publicVideos.length === 0) ||
    (Array.isArray(images) && images.length > 0 && publicImages.length === 0);
  const [mediaUnavailable, setMediaUnavailable] = useState(hasRejectedMedia);
  if (!showVideo && !showImages && !mediaUnavailable) return null;

  return (
    <div
      className={cn(
        "mt-3.5 border-t border-[#E8E5DF] pt-3.5 transition-all duration-500 ease-out motion-reduce:transition-none",
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      {showVideo && <VideoHero videos={heroVideos} onMediaFailure={() => setMediaUnavailable(true)} />}
      {(showVideo || showImages) && (
        <p className="mt-3 text-[13px] italic leading-5 text-[#16384C]/70">{GREETING_MID_TEXT}</p>
      )}
      {showVideo && showImages && <div className="h-4" />}
      {showImages && <ImageGallery images={publicImages} onImageClick={onImageClick} />}
      {mediaUnavailable && !showVideo && !showImages && (
        <p role="status" className="mt-3 text-[13px] leading-5 text-[#16384C]/70">
          Nội dung chữ vẫn hiển thị đầy đủ. Media công khai hiện không khả dụng.
        </p>
      )}
    </div>
  );
}

/**
 * Collapse the raw list to at most one brand film and one drone film. When
 * multiple brand tapes exist, prefer the web-optimized build (brand-film-web)
 * so the reader does not see two tabs named "Phim giới thiệu".
 */
function pickHeroVideos(videos: Video[] | undefined): Video[] {
  if (!Array.isArray(videos) || videos.length === 0) return [];
  const isBrand = (v: Video) => (v.kind ?? "brand") === "brand";
  const brand =
    videos.find((v) => isBrand(v) && v.url_cdn.includes("brand-film-web")) ??
    videos.find(isBrand);
  const drone = videos.find((v) => v.kind === "drone");
  const out: Video[] = [];
  if (brand) out.push(brand);
  if (drone) out.push(drone);
  return out;
}

/** Sales-toned eyebrow above a media block. */
function MediaLabel({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <header className="mb-2.5 flex items-center gap-2">
      <span
        aria-hidden="true"
        className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#16384C]/8 text-[14px] text-[#16384C]"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <span className="block text-sm font-semibold leading-[18px] text-[#16384C]">{title}</span>
        <span className="text-xs leading-4 text-[#16384C]/70">{sub}</span>
      </div>
    </header>
  );
}

const KIND_LABELS: Record<string, string> = {
  brand: "Phim giới thiệu",
  drone: "Bay quay tổng quan",
};

/**
 * Cinematic brand-film hero. All tapes stay mounted in the DOM (cheaper than
 * remounting); the inactive ones are hidden with CSS and only the active tab is
 * visible. Switching tabs resets the outgoing tape to a pristine state — paused
 * at 00:00, muted, poster showing — so it reads exactly like a fresh mount while
 * never dropping the element out of the DOM. The first tape ever to mount
 * autoplays muted (no loop) so the hero reads as a live film on open; every
 * return after a switch starts paused on the poster. Each player's play/pause
 * and sound toggles mirror the live <video> state so icons can never drift from
 * reality. Degrades to a styled poster card if the MP4 is not ready.
 */
function VideoHero({ videos, onMediaFailure }: { videos: Video[]; onMediaFailure: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const multi = videos.length > 1;

  // A <video> is a replaced element that swallows the wheel target on some
  // engines, so moving the pointer over the hero can feel like the page is
  // stuck. Forward the wheel to the chat scroll container so scrolling over the
  // film still moves the conversation up/down naturally.
  const forwardWheel = (e: React.WheelEvent) => {
    const scroller = (e.currentTarget as HTMLElement).closest<HTMLElement>(".chat-scroll");
    const el = scroller ?? (e.currentTarget as HTMLElement).parentElement;
    if (!el) return;
    el.scrollTop += e.deltaY;
  };

  return (
    <section aria-label="Video giới thiệu dự án">
      <div className="mb-2 flex items-center justify-between gap-2">
        <MediaLabel
          icon={<VideoIcon size={14} />}
          title="Tham quan dự án"
          sub="Xem phim giới thiệu và góc bay tổng quan"
        />
        {multi && (
          <div
            role="tablist"
            aria-label="Chọn thước phim"
            className="flex shrink-0 gap-1 rounded-lg bg-[#F8F7F3] p-0.5"
          >
            {videos.map((v, i) => (
              <button
                key={v.url_cdn}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs transition-colors",
                  i === activeIdx
                    ? "bg-white font-semibold text-[#16384C] shadow-sm"
                    : "text-[#16384C]/60 hover:text-[#16384C]",
                )}
              >
                {(v.kind && KIND_LABELS[v.kind]) || v.title || `Video ${i + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        onWheel={forwardWheel}
        className="relative aspect-video overflow-hidden rounded-2xl bg-[#F8F7F3] shadow-md"
      >
        {/* Every tape stays mounted; only the active one is visible. Each player
            resets itself to a pristine state whenever it leaves the active tab. */}
        {videos.map((v, i) => (
          <VideoPlayer
            key={v.url_cdn}
            video={v}
            label={(v.kind && KIND_LABELS[v.kind]) || v.title || `Video ${i + 1}`}
            active={i === activeIdx}
            autoPlay={i === 0}
            onMediaFailure={onMediaFailure}
          />
        ))}
      </div>
    </section>
  );
}

interface VideoPlayerProps {
  video: Video;
  /** Kind label shown in the scrim tag (e.g. "Phim giới thiệu"). */
  label: string;
  /** Whether this tape is the currently visible tab. */
  active: boolean;
  /** Attempt muted autoplay on this mount. Tab 0 true only before any switch. */
  autoPlay: boolean;
  onMediaFailure: () => void;
}

/**
 * A single self-contained film player (video + scrim + transport controls). It
 * stays mounted for the life of the hero; when it leaves the active tab it is
 * hidden with CSS and reset to a paused, muted state so returning to the tab
 * looks exactly like a fresh mount without dropping the element from the DOM.
 */
function VideoPlayer({ video, label, active, autoPlay, onMediaFailure }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  // Fresh mount always defaults to muted (matches the element's `muted`
  // attribute), so each tab switch returns sound to its initial setting.
  const [muted, setMuted] = useState(true);
  // Mirrors the element's real play state (via onPlaying/onPause). Starts false
  // because a browser may block even muted autoplay; a reconcile effect below
  // fixes it from the live element once the first frame is ready so the icon
  // cannot lie.
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const poster = video.poster_url || undefined;
  // Tracks the previous active value so the reset only fires on a real leave or
  // return, not on the initial render.
  const wasActiveRef = useRef(active);

  // Reset to a pristine state whenever this player leaves the active tab (and
  // again when it returns), so a tab switch always reads like a fresh mount:
  // paused at 00:00, muted, poster showing — never the last frame of a previous
  // watch. `load()` drops the buffered frame so the poster renders again while
  // the <video> element stays in the DOM (cheaper than remounting).
  useEffect(() => {
    const prev = wasActiveRef.current;
    wasActiveRef.current = active;
    if (prev === active) return;
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.muted = true;
      el.load();
    }
    setCanPlay(false);
    setPlaying(false);
    setMuted(true);
  }, [active]);

  // Reconcile both toggle affordances with reality once a frame is ready: a
  // browser can silently block muted autoplay, or unmute in flight. Reading the
  // element keeps icons honest on initial load and after a tab-switch reset.
  useEffect(() => {
    if (!canPlay) return;
    const el = videoRef.current;
    if (el) {
      setPlaying(!el.paused);
      setMuted(el.muted);
    }
  }, [canPlay]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    // Read the live element instead of trusting a possibly-stale state value so
    // rapid clicks always toggle off the current reality (no lost updates from
    // functional-setState side effects inside the updater).
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
    // First unmute counts as a user gesture, so the browser lets us start audio.
    if (!next) void el.play().catch(() => undefined);
  };

  return (
    <div className={cn("absolute inset-0", active ? "block" : "hidden")}>
      {failed ? (
        <div
          role="status"
          className="grid h-full place-items-center p-6 text-center text-[13px] leading-5 text-[#16384C]/70"
        >
          Video công khai hiện không khả dụng: {video.title}
        </div>
      ) : (
        <video
          ref={videoRef}
          src={video.url_cdn}
          poster={poster}
          muted
          playsInline
          autoPlay={active && autoPlay}
          preload="metadata"
          className="block h-full w-full object-cover"
          onCanPlay={() => setCanPlay(true)}
          onPlaying={() => {
            setCanPlay(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            // No loop: the tape freezes on its last frame and the toggle flips
            // back to Play so the reader can watch again from the start.
            setCanPlay(true);
            setPlaying(false);
          }}
          onError={() => {
            setPlaying(false);
            setFailed(true);
            onMediaFailure();
          }}
        />
      )}

      {/* Navy gradient scrim bottom: anchors the title + kind tag so the film
          reads as a framed shot, not a raw rectangle. */}
      {!failed && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2.5 bg-gradient-to-t from-[#0F172A]/80 to-transparent px-3.5 pb-3.5 pt-[34px]">
          <div className="min-w-0">
            <span className="mb-1.5 inline-block rounded-md border border-white/30 bg-white/20 px-[7px] text-[11px] font-semibold leading-5 text-white">
              {label}
            </span>
            <span className="block text-sm font-semibold leading-5 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
              {video.title}
            </span>
          </div>

          {/* Controls stay disabled until the browser confirms playable media. */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={playing ? "Tạm dừng video" : "Phát video"}
              onClick={togglePlay}
              disabled={!canPlay}
              className="inline-flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-white/35 bg-[#0F172A]/45 text-white backdrop-blur transition-colors hover:bg-[#0F172A]/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
            </button>
            <button
              type="button"
              aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
              onClick={toggleMute}
              disabled={!canPlay}
              className="inline-flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-white/35 bg-[#0F172A]/45 text-white backdrop-blur transition-colors hover:bg-[#0F172A]/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Volume2
                size={18}
                aria-hidden="true"
                className={muted ? "opacity-55" : "opacity-100"}
              />
            </button>
          </div>
        </div>
      )}

      {/* Buffering state is honest: it only describes a source not ready yet. */}
      {!failed && !canPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/20">
          <div className="rounded-full bg-[#0F172A]/55 px-3.5 py-2 text-[13px] font-semibold text-white">
            Đang tải thước phim…
          </div>
        </div>
      )}
    </div>
  );
}
