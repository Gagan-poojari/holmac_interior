'use client';
import { useState, useEffect } from 'react';
import EntranceAnimation from './components/EntranceAnimation';
import HolmacHomepage from './components/HalmacHomepage';

export default function Home() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [hasPlayedBefore, setHasPlayedBefore] = useState(false);
  const [showFade, setShowFade] = useState(true);

  useEffect(() => {
    // Check if user has seen the animation this session
    const played = sessionStorage.getItem('entrance_played');
    if (played === 'true') {
      setShowEntrance(false);
      setHasPlayedBefore(true);
    }
  }, []);

  const handleEntranceComplete = () => {
    sessionStorage.setItem('entrance_played', 'true');
    setShowEntrance(false);
    setHasPlayedBefore(true);
  };

  return (
    <>
      {showEntrance && !hasPlayedBefore && (
        <EntranceAnimation onComplete={handleEntranceComplete} />
      )}
      {(!showEntrance || hasPlayedBefore) && (
        <div>
          <HolmacHomepage />
          {showFade && (
        <div 
          className="fixed inset-0 z-10000 bg-black pointer-events-none"
          style={{ animation: 'fadeOut 0.7s ease-out forwards' }}
        />
      )}
      
      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
        </div>
      )}
    </>
  );
}