'use client';
import React, { useRef, useEffect, useState } from 'react';
import CustomLoader from './CustomLoader';

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

    // If network looks very slow, skip the entrance immediately
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const effective = conn.effectiveType || '';
      const downlink = conn.downlink || 10;
      if (effective.includes('2g') || effective.includes('slow-2g') || downlink < 0.5) {
        onComplete();
        return;
      }
    }

    let started = false;
    let finished = false;
    const TIMEOUT_MS = 6000;

    const finish = (fromEnd = false) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeoutId);
      if (fromEnd) {
        setHasPlayed(true);
        setTimeout(() => onComplete(), 300);
      } else {
        // fallback/timeout/error: immediately skip
        onComplete();
      }
    };

    // Attempt autoplay with sound, fallback to muted
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          console.log('Autoplay failed:', mutedError);
        }
      }
    };

    playVideo();

    // Handle video progress/end/error
    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.5 && !fadeOut) {
        setFadeOut(true);
      }
    };

    const handlePlaying = () => {
      started = true;
      clearTimeout(timeoutId);
    };

    const handleCanPlayThrough = () => {
      started = true;
      clearTimeout(timeoutId);
    };

    const handleEnded = () => {
      finish(true);
    };

    const handleError = () => {
      finish(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    const timeoutId = setTimeout(() => {
      if (!started) finish(false);
    }, TIMEOUT_MS);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [hasPlayed, onComplete, fadeOut]);

  if (hasPlayed) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        preload="auto"
        muted={false} 
        src="https://res.cloudinary.com/djfxdsmvk/video/upload/v1768325644/holmac_cboxyh.mp4"
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