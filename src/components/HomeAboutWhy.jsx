import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, ShieldCheck, Clock,
  IndianRupee, Headphones, Play, Phone, Sparkles
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

  const WHY_FEATURES = [
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      sub: "Relocation"
    },
    {
      icon: Clock,
      title: "On Time",
      sub: "Delivery"
    },
    {
      icon: IndianRupee,
      title: "Transparent",
      sub: "Pricing"
    },
    {
      icon: Headphones,
      title: "24×7",
      sub: "Support"
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

          {/* Right Column: Why Choose Us? (Refined & Elevated matching Reference) */}
          <div className="col-lg-4 col-md-6">
            <div className="why-choose-card royal-card p-4 h-100 d-flex flex-column justify-content-between shadow-sm">
              <div>
                <div className="text-center mb-4">
                  <h4 className="fw-extrabold text-dark fs-4 mb-1">
                    Why Choose Us?
                  </h4>
                  <div className="why-title-accent mx-auto" />
                </div>

                {/* 2x2 Feature Grid matching Reference Image */}
                <div className="row g-3 mb-4">
                  {WHY_FEATURES.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={idx} className="col-6">
                        <div className="why-feature-box text-center p-3 rounded-3 bg-white border h-100 shadow-xs">
                          <div className="why-icon-bubble mx-auto mb-2 text-primary">
                            <Icon size={26} strokeWidth={2.2} />
                          </div>
                          <div className="why-feature-title fw-bold text-dark">{feat.title}</div>
                          <div className="why-feature-sub text-muted">{feat.sub}</div>
                        </div>
                      </div>
                    );
                  })}
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
