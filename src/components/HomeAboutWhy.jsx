import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, ShieldCheck, Clock,
  DollarSign, Headphones, Play, Pause, Phone
} from 'lucide-react';
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

  return (
    <section className="about-why-section py-5 bg-light-surface">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left Column: Video Preview Player (Exact from Reference) */}
          <div className="col-lg-4 col-md-12">
            <div className="video-preview-card royal-card p-2 bg-white h-100 d-flex flex-column justify-content-between">
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
              <div className="p-2 pt-3 small text-muted text-center">
                <span className="fw-semibold text-dark">Ground Video:</span> Real On-Site Packing & Handling
              </div>
            </div>
          </div>

          {/* Middle Column: About Sunrise Packers & Movers (Exact from Reference) */}
          <div className="col-lg-5 col-md-7">
            <div className="about-content-card royal-card p-4 p-lg-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="fw-bold mb-3 text-dark">
                  About Sunrise Packers & Movers
                </h3>
                <p className="text-muted small mb-3" style={{ lineHeight: '1.7' }}>
                  We are a trusted and professional packers and movers company, providing safe, reliable and affordable relocation services across India. With disciplined handling and personal supervision by owner <strong>{COMPANY_INFO.owner}</strong>, we ensure your goods reach their destination with complete care and on time.
                </p>

                {/* 4 Checkmark Bullet Points (Exact from Reference) */}
                <div className="about-bullet-points d-flex flex-column gap-2 mb-4">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-semibold small text-dark">Professional Team</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-semibold small text-dark">Affordable Pricing</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-semibold small text-dark">Pan India Service</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span className="fw-semibold small text-dark">100% Customer Satisfaction</span>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/about" className="btn btn-quote-pill px-4 py-2 d-inline-flex align-items-center gap-2">
                  <span>Know More</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Why Choose Us? (Exact from Reference) */}
          <div className="col-lg-3 col-md-5">
            <div className="why-choose-card royal-card p-4 bg-white h-100 d-flex flex-column justify-content-between">
              <div>
                <h4 className="fw-bold mb-3 text-center text-dark">
                  Why Choose Us?
                </h4>

                {/* 2x2 Feature Grid */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="why-feature-box text-center p-2 rounded-3 bg-light border h-100">
                      <ShieldCheck size={24} className="text-primary mb-1" />
                      <div className="fs-7 fw-bold text-dark">Safe & Secure</div>
                      <div className="fs-8 text-muted">Relocation</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="why-feature-box text-center p-2 rounded-3 bg-light border h-100">
                      <Clock size={24} className="text-primary mb-1" />
                      <div className="fs-7 fw-bold text-dark">On Time</div>
                      <div className="fs-8 text-muted">Delivery</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="why-feature-box text-center p-2 rounded-3 bg-light border h-100">
                      <DollarSign size={24} className="text-primary mb-1" />
                      <div className="fs-7 fw-bold text-dark">Transparent</div>
                      <div className="fs-8 text-muted">Pricing</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="why-feature-box text-center p-2 rounded-3 bg-light border h-100">
                      <Headphones size={24} className="text-primary mb-1" />
                      <div className="fs-7 fw-bold text-dark">24×7</div>
                      <div className="fs-8 text-muted">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-royal-outline w-100 py-2 small fw-bold d-flex align-items-center justify-content-center gap-1"
                >
                  <Phone size={14} />
                  <span>Call {COMPANY_INFO.mobile}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
