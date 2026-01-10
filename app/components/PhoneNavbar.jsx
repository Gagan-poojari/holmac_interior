import { Building2, Tag, Image, Menu } from 'lucide-react';
import { useState } from 'react';

export default function PhoneNavbar() {
  const [active, setActive] = useState('about');

  const navItems = [
    { id: 'about', label: 'ABOUT', icon: Building2 },
    { id: 'products', label: 'PRODUCTS', icon: Tag },
    { id: 'gallery', label: 'GALLERY', icon: Image },
    { id: 'contact', label: 'CONTACT', icon: Menu }
  ];

  const scrollToSection = (sectionId) => {
    setActive(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideIn {
            from { 
              transform: scale(0.9);
              opacity: 0;
            }
            to { 
              transform: scale(1);
              opacity: 1;
            }
          }
          .slide-in {
            animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `
      }} />

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 px-4">
        <div className="relative">
          {/* Subtle glow behind nav */}
          <div className="absolute -inset-1 -z-20 rounded-2xl bg-[#d4af37]/10 blur-sm" />
          
          {/* Main white background */}
          <div className="absolute inset-0 -z-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]" />

          {/* Navigation Buttons */}
          <div className="relative flex justify-around items-center px-2 py-3 rounded-2xl">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl focus:outline-none cursor-pointer"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Active background - slides smoothly */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 bg-linear-to-br from-[#d4af37] to-[#c9a552] rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.4)] slide-in"
                    />
                  )}

                  {/* Active indicator - top line */}
                  {isActive && (
                    <div 
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/60 rounded-full slide-in"
                    />
                  )}

                  {/* Icon */}
                  <div 
                    className="relative z-10"
                    style={{
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    <Icon 
                      size={22} 
                      className={`transition-all duration-400 ${
                        isActive 
                          ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]' 
                          : 'text-[#5a4e3c]'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>

                  {/* Label */}
                  <span 
                    className={`
                      relative z-10 text-[10px] font-semibold tracking-wide whitespace-nowrap
                      transition-all duration-400
                      ${isActive 
                        ? 'text-white opacity-100' 
                        : 'text-[#5a4e3c] opacity-75'
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}