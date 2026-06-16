/**
 * Image caching utility for better performance
 * Provides utilities for preloading and caching images
 */

interface ImageCacheOptions {
  priority?: boolean;
  fetchPriority?: 'auto' | 'high' | 'low';
}

/**
 * Preload an image to improve performance
 * @param src - Image source URL
 * @param options - Preload options
 */
export function preloadImage(src: string, options: ImageCacheOptions = {}): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  
  if (options.priority) {
    link.setAttribute('fetchpriority', options.fetchPriority || 'high');
  }

  document.head.appendChild(link);
}

/**
 * Preload multiple images
 * @param sources - Array of image sources
 * @param options - Preload options
 */
export function preloadImages(sources: string[], options: ImageCacheOptions = {}): void {
  sources.forEach((src) => preloadImage(src, options));
}

/**
 * Check if an image is cached in the browser
 * @param src - Image source URL
 * @returns Promise that resolves to true if image is cached
 */
export function isImageCached(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    
    // Try to load from cache
    img.src = src;
    
    // If complete immediately, it's cached
    if (img.complete) {
      resolve(true);
    }
  });
}

/**
 * Prefetch an image (lower priority than preload)
 * @param src - Image source URL
 */
export function prefetchImage(src: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Create a cached image component wrapper
 * This can be used to wrap Next.js Image components with caching
 */
export const ImageCacheUtils = {
  preload: preloadImage,
  preloadMultiple: preloadImages,
  prefetch: prefetchImage,
  isCached: isImageCached,
};

