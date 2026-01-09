import { Building2, Tag, Image, Menu } from 'lucide-react';
import { useState } from 'react';

export default function PhoneNavbar() {
  const [active, setActive] = useState('company');

  const navItems = [
    { id: 'company', label: 'COMPANY', icon: Building2 },
    { id: 'offers', label: 'OFFERS', icon: Tag },
    { id: 'gallery', label: 'GALLERY', icon: Image },
    { id: 'menu', label: 'MENU', icon: Menu }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50 px-4">
      <div className="relative">
        {/* Curved white background */}
        <div className="absolute inset-0 -z-10 bg-white rounded-2xl shadow-xl" />

        {/* Navigation Buttons - white container with gold active color */}
        <div className="relative flex justify-around items-center px-3 py-3 bg-white rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all focus:outline-none ${
                  isActive ? 'bg-[#d4af37] text-white shadow-lg' : 'text-[#2d2416]'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-white' : 'text-[#2d2416]'} />
                <span className={`text-[10px] font-semibold whitespace-nowrap ${isActive ? 'text-white' : 'text-[#2d2416]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>

        {/* Subtle golden glow behind the nav */}
        <div className="absolute -inset-1 -z-20 rounded-2xl bg-[#d4af37]/10 blur-sm" />
      </div>
    </div>
  );
}