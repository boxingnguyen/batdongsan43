"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageWithSkeletonProps extends ImageProps {
  /**
   * Classes for the wrapper box: sizing (max-w-*, w-full), rounding, and any
   * responsive show/hide (`hidden md:block`, `md:hidden`). Putting responsive
   * classes here — not on `className` — makes the shimmer hide together with
   * the image, so a hidden variant never shows a lone shimmer.
   */
  wrapperClassName?: string;
}

/**
 * Content image with a shimmer skeleton while it loads.
 *
 * Contract:
 * - Pass EITHER `fill` OR `width`+`height` (standard next/image rules).
 * - Box/sizing/responsive classes go on `wrapperClassName`; `className` styles
 *   the <img> itself (e.g. `object-cover`).
 * - Intended for large, opaque content images. Not for transparent PNGs
 *   (the shimmer would show through) — use plain next/image for those.
 */
export function ImageWithSkeleton({
  wrapperClassName = "",
  className,
  fill,
  width,
  height,
  onLoad,
  onError,
  style,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish before React attaches onLoad, so the event never
  // fires. Reading `.complete` on mount covers that case.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const image = (
    <Image
      {...props}
      ref={imgRef}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: [style?.transition, "opacity 0.4s ease-in-out"]
          .filter(Boolean)
          .join(", "),
      }}
      onLoad={(e) => {
        setIsLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setIsLoaded(true);
        onError?.(e);
      }}
    />
  );

  // fill: the caller already provides a sized, relative parent. The span fills
  // that parent (absolute inset-0) so the shimmer covers the same box; the
  // <Image fill> also anchors to the parent and paints on top.
  if (fill) {
    return (
      <>
        {!isLoaded && (
          <span
            aria-hidden
            className={`image-shimmer ${wrapperClassName}`}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          />
        )}
        {image}
      </>
    );
  }

  // non-fill: the span is the sized box (aspect ratio from width/height) that
  // paints the shimmer; the image sits inside and fills it.
  return (
    <span
      className={`${!isLoaded ? "image-shimmer " : ""}${wrapperClassName}`}
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {image}
    </span>
  );
}
