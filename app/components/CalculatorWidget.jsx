'use client';
import React, { useState, useEffect, useRef } from 'react';

const CalculatorWidget = ({ onClick, label = 'CALCULATE NOW', buttonText = 'EMI', outerText }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [showCalculator, setShowCalculator] = useState(false);

  const idRef = useRef(`calcRing-${Math.random().toString(36).slice(2, 9)}`);
  const ringText = outerText ?? label;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeScale = 1 + scrollY * 0.0005;
  const strokeRotation = (scrollY * 0.1) % 360;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.phone.trim()) {
      setShowCalculator(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowCalculator(false);
    setFormData({ name: '', phone: '' });
  };

  const openModal = () => {
    setIsModalOpen(true);
    if (onClick) onClick();
  };

  return (
    <div className="fixed md:bottom-28 bottom-48 right-8 z-50 group" style={{ width: 64, height: 64 }}>
      {/* Paint stroke background */}
      <div
        className="absolute inset-0 bg-[#b59016] opacity-20 blur-xl transition-transform duration-300 ease-out pointer-events-none"
        style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          transform: `scale(${strokeScale}) rotate(${strokeRotation}deg)`,
          width: '60%',
          height: '60%',
          top: '-10%',
          left: '-10%',
        }}
      />

      {/* Button */}
      <button
        onClick={openModal}
        className="relative cursor-pointer flex items-center justify-center w-16 h-16 bg-[#b59016] text-white rounded-full shadow-md transition-all duration-500 hover:scale-110 hover:rotate-12 active:scale-95"
        aria-label="Calculator"
      >
        {/* Calculator Icon (JSX-friendly attrs) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calculator-icon"
        >
          <rect x={4} y={2} width={16} height={20} rx={2} />
          <line x1={8} y1={6} x2={16} y2={6} />
          <line x1={16} y1={14} x2={16} y2={18} />
          <path d="M16 10h.01" />
          <path d="M12 10h.01" />
          <path d="M8 10h.01" />
          <path d="M12 14h.01" />
          <path d="M8 14h.01" />
          <path d="M12 18h.01" />
          <path d="M8 18h.01" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-[#2d2416] text-[#d4af37] text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none border border-[#d4af37]/30">
          {label}
        </span>
      </button>

      {/* Circular outer text (overlays the button) */}
      <svg
        aria-hidden
        className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 120 }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path id={idRef.current} d="M50,78 a28,28 0 1,1 -0.1,0" />
        </defs>
        <text fill="#d4af37" fontSize={6} fontFamily="sans-serif" fontWeight={600}>
          <textPath xlinkHref={`#${idRef.current}`} href={`#${idRef.current}`} startOffset="50%" textAnchor="middle">
            {ringText}
          </textPath>
        </text>
      </svg>

      {/* Decorative ring on hover */}
      <div className="absolute -inset-2 border border-[#d4af37]/0 rounded-full group-hover:border-[#d4af37]/50 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="relative bg-white rounded-lg shadow-2xl p-8 w-96 max-w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" aria-label="Close">
              ×
            </button>

        <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">GET FREE ESTIMATION</h2>
                <p className="text-gray-600 text-center text-sm mb-6">Share information and get free estimation</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <button onClick={handleSubmit} className="w-full mt-6 py-3 bg-[#b59016] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-[#c9a227]">GET ESTIMATION</button>
                </div>
              </>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorWidget;
