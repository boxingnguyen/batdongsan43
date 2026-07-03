"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string;
}

export function ImageWithSkeleton({
  wrapperClassName,
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

  // For non-fill images, keep the image's own aspect ratio so the skeleton
  // reserves the correct space before the image paints.
  const aspectRatio =
    !fill && width && height ? Number(width) / Number(height) : undefined;

  return (
    <span
      className={wrapperClassName}
      style={{
        position: fill ? undefined : "relative",
        display: fill ? "contents" : "inline-block",
        width: fill ? undefined : "100%",
      }}
    >
      {/* Skeleton overlay — stays until the browser fires load/error.
          Only show for non-fill images (fill images don't need placeholder). */}
      {!isLoaded && !fill && (
        <span
          className="absolute inset-0 z-10 block"
          style={{
            borderRadius: "inherit",
            overflow: "hidden",
            paddingBottom: aspectRatio
              ? `calc(100% / ${aspectRatio})`
              : undefined,
          }}
        >
          <Skeleton
            className="!block h-full w-full"
            containerClassName="!block h-full w-full leading-none"
            style={{ height: "100%" }}
          />
        </span>
      )}

      {/* The real <img> is ALWAYS in the DOM and fetching — we only fade it in.
          The browser's load/error events are the single source of truth. */}
      <Image
        {...props}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          // Even on error, stop showing the skeleton so it doesn't spin forever.
          setIsLoaded(true);
          onError?.(e);
        }}
      />
    </span>
  );
}
