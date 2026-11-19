import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function HomeHero({ onQuoteClick }) {
  // Rich Solid Trust Badges matching Reference Image exactly
  const TRUST_BADGES = [
    {
      label: "Safe Packing",
      iconType: "house",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
      )
    },
    {
      label: "Secure Transport",
      iconType: "shield",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      )
    },
    {
      label: "On Time Delivery",
      iconType: "clock",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11V7h1.5v6zm2.5-3.5h-2V7h2v4.5z"/>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      )
    },
    {
      label: "Trusted Service",
      iconType: "handshake",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#1E1238">
          <path d="M21.71 8.71l-1.42-1.42a1 1 0 0 0-1.41 0L16.5 9.67l-2.09-2.09a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41l1.38 1.38-4.25 4.25-1.42-1.42a1 1 0 0 0-1.41 0L3.71 16.7a1 1 0 0 0 0 1.41l2.12 2.12a1 1 0 0 0 1.41 0l6.36-6.36 1.38 1.38a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41l-2.09-2.09 2.38-2.38 3.59 3.59a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="home-hero-section position-relative overflow-hidden py-4 py-lg-5">
      {/* Background road/highway ambient subtle styling */}
      <div className="hero-highway-bg" />

      <div className="container position-relative">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column: Heading, Tagline, Trust Badges, Owner Banner, CTAs */}
          <div className="col-lg-7">
            <div className="hero-left-content pe-lg-3">
              {/* Main Headline (Exact Typography matching Reference Image) */}
              <h1 className="hero-main-title mb-1">
                Sunrise Packers & Movers
              </h1>

              {/* Sub-headline */}
              <div className="hero-sub-title mb-3">
                Service all India
              </div>

              {/* Tagline Ribbon / Badge (Exact Golden Pill from Reference) */}
              <div className="hero-tagline-ribbon d-inline-block px-4 py-2 rounded-pill mb-4 shadow-sm">
                <span>{COMPANY_INFO.tagline}</span>
              </div>

              {/* 4 Circle Badges in a Row (Exact Solid Icons from Reference) */}
              <div className="hero-trust-circles d-flex flex-wrap gap-2 gap-sm-4 mb-4">
                {TRUST_BADGES.map((badge, idx) => (
                  <div key={idx} className="trust-circle-item text-center">
                    <div className="trust-circle-icon mx-auto mb-2 shadow-sm">
                      {badge.icon}
                    </div>
                    <span className="trust-circle-label fw-bold text-dark">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Owner & Contact Pill Card (Exact from Reference) */}
              <div className="hero-owner-banner p-3 px-4 rounded-4 text-white d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mb-4 shadow-md">
                <div className="owner-title-text fw-bold fs-5 d-flex align-items-center gap-2">
                  <span>Owner: <strong>{COMPANY_INFO.owner}</strong></span>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="owner-phone-link d-inline-flex align-items-center gap-2 text-white text-decoration-none fw-bold fs-5"
                >
                  <i className="bi bi-telephone-fill text-warning" />
                  <span>Mo.No. {COMPANY_INFO.mobile}</span>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="hero-actions d-flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onQuoteClick}
                  className="btn btn-quote-pill px-4 py-3 fw-bold fs-6 shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>Get Free Quote</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-royal-outline-light px-4 py-3 fw-bold fs-6"
                >
                  <Phone size={18} />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid px-4 py-3 fw-bold fs-6 shadow-sm"
                >
                  <i className="bi bi-whatsapp me-1" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Moving Truck & Mover Delivery Visual (Exact Reference Composition) */}
          <div className="col-lg-5">
            <div className="hero-truck-visual position-relative rounded-4 overflow-hidden shadow-xl border bg-white p-2">
              <div className="truck-img-wrapper position-relative rounded-3 overflow-hidden">
                <img
                  src="/images/hero-truck-mover.jpg"
                  alt="Sunrise Packers & Movers Logistics Moving Fleet & Professional Mover"
                  className="w-100 object-fit-cover hero-visual-main-img"
                  style={{ maxHeight: '430px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
