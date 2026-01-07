'use client';
import React, { useEffect } from 'react';

export default function CustomLoader({ logoSrc = null }) {
  useEffect(() => {
    // Inject styles only once on client side
    if (typeof document !== 'undefined' && !document.getElementById('loader-animations')) {
      const style = document.createElement('style');
      style.id = 'loader-animations';
      style.textContent = `
        @keyframes elegantRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
        @keyframes progress {
          to { stroke-dashoffset: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Progress ring */}
          <svg 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-60 h-60"
            viewBox="0 0 240 240"
          >
            <circle 
              cx="120" 
              cy="120" 
              r="60"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              strokeDasharray="754"
              strokeDashoffset="754"
              opacity="0.3"
              className="origin-center -rotate-90"
              style={{
                animation: 'progress 6s linear infinite'
              }}
            />
          </svg>

          {/* Logo container */}
          <div 
            className="w-[90px] h-[90px]"
            style={{
              animation: 'elegantRotate 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.5))'
            }}
          >
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            ) : (
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f4d675" stopOpacity="1" />
                    <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b8941e" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <g transform="translate(100, 100)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <path 
                      key={angle}
                      d="M 0,-70 L 15,-20 L 0,-30 L -15,-20 Z" 
                      fill="url(#g1)" 
                      stroke="#2a1f00" 
                      strokeWidth="2"
                      transform={`rotate(${angle})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="15" fill="url(#g1)" stroke="#2a1f00" strokeWidth="2"/>
                </g>
              </svg>
            )}
          </div>
        </div>

        {/* Loading text */}
        <div 
          className="mt-10 text-[#d4af37] text-lg font-light tracking-[4px] uppercase"
          style={{ animation: 'fade 2s ease-in-out infinite' }}
        >
          Loading<span style={{ animation: 'dots 2s steps(4, end) infinite' }} />
        </div>
      </div>
    </div>
  );
}