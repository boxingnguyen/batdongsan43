'use client';

import Image from 'next/image';

const FloatingContactButtons = () => {
  const ZALO_LINK = "https://zalo.me/0345747138";
  const PHONE_NUMBER = "0345.747.138"; // Formatted phone number
  const PHONE_LINK = "tel:0345747138";

  return (
    // Fixed container at the bottom-right corner
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-5">
      
      {/* 1. Zalo Button (On top) */}
      <a
        href={ZALO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        title="Contact Zalo"
        className="relative"
      >
        <Image
          src="/images/zalo-1.png" // Your Zalo icon
          width={64}
          height={64}
          alt="Zalo"
          className="w-16 h-16 relative z-10" // 64px size
        />
      </a>

      {/* 2. Phone Button (On bottom) */}
      <a
        href={PHONE_LINK}
        title="Call Hotline"
        className="flex items-center group"
      >
        {/* Phone Icon (Left side) - 3 Layers */}
        <div className="relative flex-shrink-0">
          
          {/* Layer 2 (z-10): Red Circle background */}
          <div className="absolute inset-0 bg-red-500 rounded-full z-10"></div>

          {/* Layer 3 (z-20): Phone Icon */}
          <Image
            src="/images/icon-1.png" // Your Phone icon
            width={64}
            height={64}
            alt="Phone"
            className="w-16 h-16 relative z-20" // 64px size
          />
        </div>

        {/* Red Bar with Number (Right side) */}
        <div 
          className="
            bg-red-500 text-white text-lg font-bold px-5 py-3 
            rounded-r-full shadow-lg
            ml-[-16px] /* Connects to the icon */
            relative z-0 /* Layer 1 (z-0): Bottom layer */
          "
        >
          {PHONE_NUMBER}
        </div>
      </a>

    </div>
  );
};

export default FloatingContactButtons;