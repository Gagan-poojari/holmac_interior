"use client"
import React, { useState, useEffect } from 'react';
import {  ArrowLeft,ChevronDown, CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: '3.3',
      priceLabel: 'Lakh',
      subtitle: 'Value-driven design within budget',
      description: 'Perfect for homeowners seeking quality within budget',
      items: {
        Kitchen: '1.9 Lakh',
        Wardrobe: '0.8 Lakh',
        'Other Interiors': '0.7 Lakh'
      },
      includes: [
        'Professional Design Consultation',
        'Basic 3D Visualization',
        'Installation Support',
        '1 Year Warranty',
        'Basic Color Consultation'
      ],
      specs: {
        Shape: 'L-shaped',
        'Wall Size': '9ft × 7ft',
        Material: 'Aria',
        Finish: 'Nova SF Laminate',
        Hardware: 'Hettich'
      },
      isPopular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '4.3',
      priceLabel: 'Lakh',
      subtitle: 'Perfect balance of style and functionality',
      description: 'Most loved by our customers for exceptional value',
      items: {
        Kitchen: '2.5 Lakh',
        Wardrobe: '1.0 Lakh',
        'Other Interiors': '0.7 Lakh'
      },
      includes: [
        'Premium Design Consultation',
        'Advanced 3D Visualization',
        'Professional Site Visit',
        '3 Years Warranty',
        'Premium Material Selection',
        'Interior Design Tips'
      ],
      specs: {
        Shape: 'L-shaped',
        'Wall Size': '9ft × 7ft',
        Material: 'DC Gold',
        Finish: 'Nova SF Laminate',
        Hardware: 'Hettich'
      },
      isPopular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '5.5',
      priceLabel: 'Lakh',
      subtitle: 'Exclusive designs for luxurious spaces',
      description: 'Premium experience with personalized luxury design',
      items: {
        Kitchen: '3.1 Lakh',
        Wardrobe: '1.4 Lakh',
        'Other Interiors': '0.9 Lakh'
      },
      includes: [
        'Luxury Design Expert Consultation',
        'Premium 3D & VR Visualization',
        'Multiple Professional Site Visits',
        'Lifetime Warranty & Support',
        'Exclusive Material Options',
        'Personalized Interior Styling'
      ],
      specs: {
        Shape: 'L-shaped',
        'Wall Size': '9ft × 7ft',
        Material: 'Super Ply',
        Finish: 'DC Premium Laminate',
        Hardware: 'Hettich'
      },
      isPopular: false
    }
  ];

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      {/* Header Section */}
    <nav className="sm:fixed top-0 w-full z-40 transition-all duration-500"
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
      <main className="flex-1 overflow-y-auto px-8 mt-0 sm:mt-16 py-8">
        {/* Title Section */}
        <div className="mb-8 text-center shrink-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Starting Estimates
          </h2>
          <p className="text-lg text-gray-600 font-medium mb-1">
            for 3 Lifestyle Options
          </p>
          <p className="text-sm text-gray-500">
            Kitchen, 1 BHK, 3 Other Interiors • Get a price closer to your requirement by changing the details
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg overflow-hidden border transition-all duration-300 flex flex-col ${
                plan.isPopular
                  ? 'border-yellow-400 bg-linear-to-b from-white to-yellow-50 shadow-lg ring-2 ring-yellow-200'
                  : 'border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-yellow-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="bg-yellow-600 text-white text-center py-2.5 font-bold text-sm tracking-wide">
                  ★ MOST POPULAR
                </div>
              )}

              {/* Card Header */}
              <div className={`px-5 pt-5 pb-4 border-b ${plan.isPopular ? 'border-yellow-100' : 'border-gray-100'}`}>
                <h3 className={`text-lg font-bold mb-1 ${plan.isPopular ? 'text-yellow-700' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs ${plan.isPopular ? 'text-yellow-600' : 'text-gray-600'} font-medium mb-3`}>
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-yellow-600">₹{plan.price}</span>
                  <span className="text-gray-600 font-semibold text-xs">{plan.priceLabel}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{plan.description}</p>
              </div>

              {/* Price Breakdown */}
              <div className={`px-5 py-4 border-b text-xs ${plan.isPopular ? 'border-yellow-100 bg-yellow-50' : 'border-gray-100'}`}>
                {Object.entries(plan.items).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1.5">
                    <span className="text-gray-700 font-medium">{key}</span>
                    <span className="font-bold text-yellow-700">₹ {value}</span>
                  </div>
                ))}
              </div>

              {/* Includes Section */}
              <div className="px-5 py-4 grow overflow-y-auto">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  What's Included
                </h4>
                <div className="space-y-2">
                  {plan.includes.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${plan.isPopular ? 'text-yellow-600' : 'text-yellow-500'}`} />
                      <span className="text-xs text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Details */}
              <div className={`px-5 py-3 border-t ${plan.isPopular ? 'border-yellow-100' : 'border-gray-100'}`}>
                <button
                  onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                  className={`flex items-center justify-between w-full py-2 font-semibold text-xs transition-colors ${
                    plan.isPopular ? 'text-yellow-700 hover:text-yellow-800' : 'text-gray-900 hover:text-yellow-700'
                  }`}
                >
                  <span>Specs</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${expandedPlan === plan.id ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedPlan === plan.id && (
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                    {Object.entries(plan.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Features Row */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shrink-0">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600 mb-1">100%</div>
              <p className="text-xs text-gray-700 font-medium">Professional</p>
              <p className="text-xs text-gray-500 mt-0.5">Expert consultation</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600 mb-1">Quick</div>
              <p className="text-xs text-gray-700 font-medium">Fast Delivery</p>
              <p className="text-xs text-gray-500 mt-0.5">Efficient service</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600 mb-1">Support</div>
              <p className="text-xs text-gray-700 font-medium">Full Warranty</p>
              <p className="text-xs text-gray-500 mt-0.5">Peace of mind</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}