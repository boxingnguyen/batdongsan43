'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { preloadImage } from '@/lib/imageCache';

interface CachedImageProps extends ImageProps {
  preload?: boolean;
  priority?: boolean;
}

/**
 * Enhanced Image component with caching support
 * Wraps Next.js Image with preloading capabilities
 */
export default function CachedImage({
  src,
  preload = false,
  priority = false,
  alt = '',
  ...props
}: CachedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // Preload image if requested
    if (preload && typeof src === 'string') {
      preloadImage(src, { priority, fetchPriority: priority ? 'high' : 'auto' });
    }

    // Handle src changes
    if (src) {
      setImageSrc(src);
    }
  }, [src, preload, priority]);

  return (
    <Image
      src={imageSrc}
      priority={priority}
      alt={alt}
      {...props}
    />
  );
}

