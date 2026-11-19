import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Play, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function HomeAboutWhy() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Solid, Bold Icons matching Reference Image exactly
  const WHY_FEATURES = [
    {
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      line1: "Safe & Secure",
      line2: "Relocation"
    },
    {
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
        </svg>
      ),
      line1: "On Time",
      line2: "Delivery"
    },
    {
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M18 6h-3.5c-.3-1.7-1.5-3-3.5-3H6v3h3c1.7 0 2.5.8 2.8 2H6v3h6c-.3 1.5-1.5 2.5-3 2.5H6v2.5L13 21h3.5l-7-6.5c2.8-.2 4.8-2 5.3-4.5H18V6z"/>
        </svg>
      ),
      line1: "Transparent",
      line2: "Pricing"
    },
    {
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"/>
        </svg>
      ),
      line1: "24×7",
      line2: "Support"
    }
  ];

  return (
    <section className="about-why-section py-5 bg-light-surface">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left Column: Video Preview Player (Exact from Reference) */}
          <div className="col-lg-4 col-md-12">
            <div className="video-preview-card royal-card p-3 bg-white h-100 d-flex flex-column justify-content-between shadow-sm">
              <div className="video-player-container position-relative rounded-3 overflow-hidden bg-black flex-grow-1">
                <video
                  ref={videoRef}
                  src="/videos/work-video.mp4"
                  poster="/images/truck-open-loading.jpg"
                  className="w-100 h-100 object-fit-cover"
                  playsInline
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                  <button
                    type="button"
                    className="video-play-btn-center"
                    onClick={togglePlay}
                    aria-label="Play on-site moving video"
                  >
                    <Play size={28} className="fill-white text-white ms-1" />
                  </button>
                )}
              </div>
              <div className="pt-3 small text-muted text-center d-flex align-items-center justify-content-center gap-2">
                <span className="badge bg-royal-primary text-white fs-8">Real Footage</span>
                <span className="text-dark fw-semibold">On-Site Packaging & Transport</span>
              </div>
            </div>
          </div>

          {/* Middle Column: About Sunrise Packers & Movers (Exact from Reference) */}
          <div className="col-lg-4 col-md-6">
            <div className="about-content-card royal-card p-4 bg-white h-100 d-flex flex-column justify-content-between shadow-sm">
              <div>
                <h3 className="fw-extrabold mb-3 text-dark fs-4">
                  About Sunrise Packers & Movers
                </h3>
                <p className="text-muted small mb-3" style={{ lineHeight: '1.75' }}>
                  We are a trusted and professional packers and movers company, providing safe, reliable and affordable relocation services across India. With disciplined handling and direct oversight by <strong>{COMPANY_INFO.owner}</strong>, we ensure your goods reach their destination with complete care and on time.
                </p>

                {/* 4 Checkmark Bullet Points (Exact from Reference) */}
                <div className="about-bullet-points d-flex flex-column gap-2 mb-4">
                  <div className="d-flex align-items-center gap-2 p-1">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-bold small text-dark">Professional Team</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 p-1">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-bold small text-dark">Affordable Pricing</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 p-1">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-bold small text-dark">Pan India Service</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 p-1">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-bold small text-dark">100% Customer Satisfaction</span>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/about" className="btn btn-quote-pill px-4 py-2 d-inline-flex align-items-center gap-2 fw-bold">
                  <span>Know More</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Us? (Exact Smooth Light Blue Card from Reference) */}
          <div className="col-lg-4 col-md-6">
            <div className="why-choose-reference-card p-4 h-100 d-flex flex-column justify-content-between shadow-sm rounded-4">
              <div>
                <div className="text-center mb-4">
                  <h4 className="fw-extrabold text-dark fs-3 mb-0">
                    Why Choose Us?
                  </h4>
                </div>

                {/* 2x2 Feature Grid directly on soft background matching Reference Image */}
                <div className="row g-4 mb-3 text-center">
                  {WHY_FEATURES.map((feat, idx) => (
                    <div key={idx} className="col-6">
                      <div className="why-feature-item">
                        <div className="why-solid-icon mb-2">
                          {feat.icon}
                        </div>
                        <div className="why-feature-line1 fw-bold text-dark">
                          {feat.line1}
                        </div>
                        <div className="why-feature-line2 text-dark">
                          {feat.line2}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-royal-outline w-100 py-2 small fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <Phone size={15} />
                  <span>Call Owner: {COMPANY_INFO.mobile}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
