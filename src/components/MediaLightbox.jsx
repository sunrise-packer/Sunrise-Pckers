import React, { useEffect, useRef } from 'react';
import { X, Play, Maximize, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaLightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={onPrev}
            aria-label="Previous Media"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {hasNext && (
          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={onNext}
            aria-label="Next Media"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Media Container */}
        <div className="lightbox-media-container text-center">
          {item.type === 'video' ? (
            <div className="lightbox-video-wrapper">
              <video
                ref={videoRef}
                src={item.src}
                controls
                autoPlay
                playsInline
                className="lightbox-video-player"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="lightbox-img"
            />
          )}
        </div>

        {/* Caption Bar */}
        <div className="lightbox-caption-bar mt-3 p-3 bg-dark text-white rounded-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="fw-bold mb-0 text-white">{item.title}</h6>
            <span className="badge bg-primary text-uppercase px-2 py-1 small">{item.category}</span>
          </div>
          {item.description && (
            <p className="small text-silver mb-0">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
