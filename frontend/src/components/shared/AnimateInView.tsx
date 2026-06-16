'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

// Định nghĩa props cho component
interface AnimateInViewProps {
  children: ReactNode;
  delay?: number; // Độ trễ (ms)
  className?: string;
}

/**
 * Component tạo hiệu ứng xuất hiện mượt mà khi cuộn vào khung nhìn (Fade-in and Slide-up)
 * Sử dụng Intersection Observer API.
 */
const AnimateInView: React.FC<AnimateInViewProps> = ({ children, delay = 0, className = '' }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Nếu phần tử lọt vào khung nhìn và chưa từng được render (isVisible = false)
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
        // Ngừng quan sát sau khi đã hiển thị
        observer.unobserve(domRef.current as Element);
      }
    }, {
      root: null, // Quan sát toàn bộ viewport
      rootMargin: '0px',
      threshold: 0.1, // Phần tử hiện ra 10% là kích hoạt hiệu ứng
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    // Cleanup function
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={domRef}
      className={`
        transition-all duration-700 ease-out
        ${className}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimateInView;