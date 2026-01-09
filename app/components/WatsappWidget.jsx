'use client';
import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = ({ phoneNumber = "919916511351", message = "Hello Holmac! I'm interested in your wall finishes." }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Logic for the paint stroke animation scale/rotation based on scroll
  const strokeScale = 1 + (scrollY * 0.0005); 
  const strokeRotation = (scrollY * 0.1) % 360;

  return (
    <div className="fixed md:bottom-8 bottom-28 right-8 z-9999 group">
      {/* The "Cool" Background Animation (Paint Stroke Effect) */}
      <div 
        className="absolute inset-0 bg-[#d4af37] opacity-20 blur-xl transition-transform duration-300 ease-out pointer-events-none"
        style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', // Organic shape
          transform: `scale(${strokeScale}) rotate(${strokeRotation}deg)`,
          width: '60%',
          height: '60%',
          top: '-10%',
          left: '-10%'
        }}
      />

      {/* The Icon Button */}
      <button
        onClick={handleClick}
        className="relative cursor-pointer flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:rotate-12 active:scale-95 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp size={32} fill="currentColor" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-[#2d2416] text-[#d4af37] text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none border border-[#d4af37]/30">
          BOOK A FREE CONSULTATION
        </span>
        {/* <span className="absolute right-full mr-4 px-4 py-2 bg-[#2d2416] text-[#d4af37] text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none border border-[#d4af37]/30">
          WHATSAPP US
        </span> */}
      </button>

      {/* Extra decorative "Stroke" that appears on hover */}
      <div className="absolute -inset-2 border border-[#d4af37]/0 rounded-full group-hover:border-[#d4af37]/50 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
    </div>
  );
};

export default WhatsAppWidget;