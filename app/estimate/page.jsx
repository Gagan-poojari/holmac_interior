"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(e.target.scrollLeft || window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen bg-plaster overflow-hidden flex flex-col">
      {/* Header Section */}
      <nav
        className="sm:fixed top-0 w-full z-40 transition-all duration-500"
        style={{
          background: scrollY > 50 ? 'rgba(250, 250, 248, 0.85)' : 'rgba(250, 250, 248, 0.6)',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
          borderBottom: scrollY > 50 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[#4a4237] hover:text-[#d4af37] transition-all duration-300 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-light tracking-wider hidden sm:inline">Back to Home</span>
          </a>

          <div className="flex items-center gap-3">
            <img src="/holmac_circle.png" alt="Holmac" className="h-11 w-11 opacity-90" />
            <div className="hidden sm:block">
              <h1 className="text-base font-medium text-[#2d2416] tracking-wide">HOLMAC</h1>
              <p className="text-xs tracking-widest text-[#b59016] font-light">INTERIOR</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 md:mt-20 mt-0 py-8">
        
        {/* Checkmark Circle */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <CheckCircle size={50} className="text-[#9b7d54]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Thank You Heading */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          THANK YOU
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-700 mb-6 font-light">
          Your enquiry has been submitted
        </p>

        {/* Description */}
        <div className="text-center max-w-2xl mb-10 space-y-3">
          <p className="text-gray-600 font-light">
            One of our team members will contact you soon.
          </p>
          <p className="text-gray-600 font-light">
            If you wish to contact us immediately, please call us on
          </p>
          <a href="tel:+919164315156" className="text-[#b59016] font-semibold hover:text-[#d4af37] transition-colors text-lg">
            (+91) 9164315156
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mb-10"></div>

        {/* Availability Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#8b6f47] mb-6 tracking-wide">
            WE ARE AVAILABLE FROM
          </h2>
          <div className="space-y-3">
            <p className="text-gray-900 font-semibold text-lg">
              8:00am - 10:00pm IST (Mon-Sat)
            </p>
            <p className="text-gray-900 font-semibold text-lg">
              9:00am - 09:00pm IST (Sunday)
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}