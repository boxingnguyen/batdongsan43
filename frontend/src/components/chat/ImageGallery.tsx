"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, CircleCheck, Image as ImageIcon, X } from "lucide-react";
import type { Image as ImageContract, ImageMatch } from "@/lib/chat/contracts";
import { filterPublicImages } from "@/lib/chat/mediaPolicy";
import { cn } from "@/lib/utils";
interface ImageGalleryProps {
  images: ImageContract[];
  /** Page-level lightbox hook; when absent the inline portal lightbox is used. */
  onImageClick?: (src: string) => void;
}

/**
 * Kind metadata for the four asset types the backend can return. The accent is
 * always drawn from the app's single navy primary; each kind only shifts its
 * soft tint and label so the row stays harmonious instead of rainbow-colored.
 * Each intro is a short sales-toned line shown under the backend caption.
 */
const KIND_META: Record<string, { label: string; soft: string; text: string; intro: string }> = {
  matbang: {
    label: "Mặt bằng",
    soft: "bg-[#16384C]/8 text-[#16384C]",
    text: "text-[#16384C]",
    intro: "Bố cục không gian tối ưu, hình dung trọn cuộc sống tại dự án.",
  },
  banggia: {
    label: "Bảng giá",
    soft: "bg-[#5C8269]/10 text-[#5C8269]",
    text: "text-[#5C8269]",
    intro: "Cơ hội đầu tư rõ ràng — tham khảo mức giá theo từng căn.",
  },
  toroi: {
    label: "Tờ rơi",
    soft: "bg-[#C9A45D]/15 text-[#8A6D33]",
    text: "text-[#8A6D33]",
    intro: "Tổng quan dự án trong một cái nhìn, từ tiện ích đến vị trí.",
  },
  "thanh-toan": {
    label: "Thanh toán",
    soft: "bg-[#E8E5DF] text-[#16384C]",
    text: "text-[#16384C]",
    intro: "Chính sách thanh toán linh hoạt, chủ động kế hoạch tài chính.",
  },
};

const DEFAULT_KIND = {
  label: "Hình ảnh",
  soft: "bg-[#F8F7F3] text-[#16384C]/60",
  text: "text-[#16384C]/60",
  intro: "",
};

/**
 * Visual treatment for the "why this image" badge. "exact" is the unit the user
 * asked for, so it leads with a filled check on the navy soft tint; "similar" is
 * a comparable unit for side-by-side reference, so it stays muted on the neutral
 * surface. "semantic" (or an absent match) renders no badge at all.
 */
const MATCH_META: Record<
  Exclude<ImageMatch, "semantic">,
  { soft: string; text: string; icon: ReactNode; fallback: string }
> = {
  exact: {
    soft: "bg-[#16384C]/8",
    text: "text-[#16384C]",
    icon: <CircleCheck size={12} aria-hidden="true" />,
    fallback: "Đúng căn bạn hỏi",
  },
  similar: {
    soft: "bg-[#F8F7F3]",
    text: "text-[#16384C]/60",
    icon: null,
    fallback: "Căn tương tự để so sánh",
  },
};

/** Resolve the badge copy, falling back to a sensible default when reason is empty. */
function reasonText(image: ImageContract): string | null {
  if (image.match !== "exact" && image.match !== "similar") return null;
  const reason = image.reason?.trim();
  return reason && reason.length > 0 ? reason : MATCH_META[image.match].fallback;
}

/** Human-friendly grouping header for the whole gallery. */
const GALLERY_TITLE = "Hình ảnh & tài liệu dự án";

/**
 * Renders a responsive, lightbox-capable gallery of project illustration assets
 * inside an assistant answer. Cards lift on hover; clicking any card opens the
 * inline lightbox anchored at that image (click-outside, X, arrows, Escape).
 */
export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const publicImages = filterPublicImages(images).filter(
    (image) => !failedIds.has(image.image_id),
  );
  // The lightbox is portaled to <body>: ancestors here (notably GreetingMedia's
  // translate-y wrapper and the grid figure's hover transform) create containing
  // blocks that would trap a `fixed` overlay inside the bubble. The mount flag
  // keeps document.body access off the server render pass.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Escape closes the lightbox regardless of where focus sits: an onKeyDown on
  // the overlay div never fires without focus, so the listener lives on window
  // while the dialog is open.
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);
  if (publicImages.length === 0) return null;

  const active = activeIndex !== null ? publicImages[activeIndex] : null;


  return (
    <section
      className="mt-3.5 border-t border-[#E8E5DF] pt-3.5"
      aria-label={GALLERY_TITLE}
    >
      <header className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#16384C]/8 text-[#16384C]">
          <ImageIcon size={14} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="block text-sm font-semibold leading-[18px] text-[#16384C]">
            {GALLERY_TITLE}
          </p>
          <p className="text-xs leading-4 text-[#16384C]/60">
            Bấm vào ảnh để xem cận cảnh
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5">
        {publicImages.map((im, index) => {
          const kind = KIND_META[im.kind] ?? DEFAULT_KIND;
          return (
            <figure
              key={im.image_id}
              className="flex cursor-zoom-in flex-col overflow-hidden rounded-xl border border-[#E8E5DF] bg-white shadow-sm transition duration-200 hover:-translate-y-[3px] hover:shadow-lg"
              onClick={() =>
                onImageClick ? onImageClick(im.url_cdn) : setActiveIndex(index)
              }
            >
              <div className="relative aspect-[4/3] bg-[#F8F7F3]">
                {/* Plain <img>: CDNs come from the media allowlist, mirroring
                    the repo's plain-img convention for external origins. */}
                <img
                  src={im.url_cdn}
                  alt={im.alt_text ?? im.title ?? ""}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                  onError={() =>
                    setFailedIds((current) => new Set(current).add(im.image_id))
                  }
                />
              </div>
              <figcaption className="flex flex-1 flex-col gap-1.5 px-2.5 pb-2.5 pt-2">
                <span
                  className={cn(
                    "self-start rounded-md px-1.5 text-[11px] font-semibold leading-5",
                    kind.soft,
                  )}
                >
                  {kind.label}
                </span>
                <span className="block text-[13px] font-semibold leading-[18px] text-[#16384C]">
                  {im.title}
                </span>
                {(() => {
                  const text = reasonText(im);
                  if (text == null) return null;
                  const meta =
                    im.match === "exact" ? MATCH_META.exact : MATCH_META.similar;
                  return (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 self-start rounded-md border px-[7px] text-[11px] font-semibold leading-5",
                        meta.soft,
                        meta.text,
                        im.match === "exact" ? "border-[#16384C]/20" : "border-[#E8E5DF]",
                      )}
                    >
                      {meta.icon}
                      {text}
                    </span>
                  );
                })()}
                {im.caption != null && im.caption.length > 0 && (
                  <span className="text-xs leading-[18px] text-[#16384C]/60">
                    {im.caption}
                  </span>
                )}
                {kind.intro.length > 0 && (
                  <span className="text-[11px] italic leading-4 text-[#16384C]/40">
                    {kind.intro}
                  </span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {active &&
        mounted &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title || GALLERY_TITLE}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Đóng xem ảnh"
            onClick={() => setActiveIndex(null)}
          >
            <X size={20} aria-hidden="true" />
          </button>
          {activeIndex !== null && publicImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Ảnh trước"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) =>
                    i === null ? null : (i - 1 + publicImages.length) % publicImages.length,
                  );
                }}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Ảnh sau"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) =>
                    i === null ? null : (i + 1) % publicImages.length,
                  );
                }}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}
          <figure
            className="flex max-h-full max-w-5xl flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url_cdn}
              alt={active.alt_text ?? active.title ?? ""}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
            {(active.title || active.caption) && (
              <figcaption className="text-center text-sm text-white/80">
                {active.title}
                {active.caption ? ` — ${active.caption}` : ""}
              </figcaption>
            )}
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
}
