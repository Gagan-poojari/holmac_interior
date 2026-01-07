'use client';
import { useState, useEffect } from 'react';
import EntranceAnimation from './components/EntranceAnimation';

export default function Home() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [hasPlayedBefore, setHasPlayedBefore] = useState(false);

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
          YourActualWebsite
        </div>
      )}
    </>
  );
}