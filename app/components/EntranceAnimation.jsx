'use client';
import React, { useRef, useEffect, useState } from 'react';

export default function EntranceAnimation({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (hasPlayed) {
      onComplete();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay with sound
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // If autoplay with sound fails, try muted
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          console.log('Autoplay failed:', mutedError);
        }
      }
    };

    playVideo();

    // Handle video end
    const handleTimeUpdate = () => {
      // Start fade 0.5s before video ends
      if (video.duration - video.currentTime <= 0.5 && !fadeOut) {
        setFadeOut(true);
      }
    };

    const handleEnded = () => {
      setHasPlayed(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [hasPlayed, onComplete, fadeOut]);

  if (hasPlayed) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        preload="auto"
        src="/entrance_video.mp4"
      />
      
      {fadeOut && (
        <div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}