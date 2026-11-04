import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_CONTENT, BRAND_CONFIG } from '../config/siteContent';

interface HeroVideoProps {
  onNavigateToEnquiry: () => void;
  onExploreClick: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onNavigateToEnquiry,
  onExploreClick
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <section className="hero-video-section" aria-label="Introduction Video Hero">
      {/* Background Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          className="hero-video-media"
          src={BRAND_CONFIG.heroVideoPath}
          poster={BRAND_CONFIG.heroPosterPath}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setHasError(true)}
          aria-hidden="true"
        />
      )}

      {/* Fallback Poster Background if error or loading */}
      {(hasError || !videoLoaded) && (
        <div
          className="hero-video-media"
          style={{
            backgroundImage: `url(${BRAND_CONFIG.heroPosterPath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-hidden="true"
        />
      )}

      {/* Readability Overlay Gradient */}
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* Content Layer */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <ShieldCheck size={16} />
            <span>{HERO_CONTENT.badge}</span>
          </div>

          <h1 className="hero-headline">{HERO_CONTENT.headline}</h1>

          <p className="hero-supporting-text">{HERO_CONTENT.supportingText}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onNavigateToEnquiry}
            >
              {HERO_CONTENT.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-white btn-lg"
              onClick={onExploreClick}
            >
              {HERO_CONTENT.secondaryCta}
            </button>
          </div>

          <div className="hero-subnote">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
            <span>{HERO_CONTENT.startingPriceNote}</span>
          </div>
        </div>
      </div>

      {/* Accessible Video Play/Pause Control Button */}
      {!hasError && (
        <button
          type="button"
          className="video-control-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <>
              <Pause size={14} aria-hidden="true" />
              <span>Pause video</span>
            </>
          ) : (
            <>
              <Play size={14} aria-hidden="true" />
              <span>Play video</span>
            </>
          )}
        </button>
      )}
    </section>
  );
};

