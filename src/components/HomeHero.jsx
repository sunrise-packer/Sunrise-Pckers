import React from 'react';
import {
  ShieldCheck, Truck, Clock, Award, Phone,
  MessageCircle, ArrowRight, CheckCircle2, MapPin
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function HomeHero({ onQuoteClick }) {
  const TRUST_BADGES = [
    { label: "Safe Packing", icon: ShieldCheck, sub: "Multi-Layer Wrap" },
    { label: "Secure Transport", icon: Truck, sub: "Closed Carrier" },
    { label: "On Time Delivery", icon: Clock, sub: "Scheduled Routes" },
    { label: "Trusted Service", icon: Award, sub: "Direct Oversight" }
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

              {/* 4 Circle Badges in a Row (Exact from Reference) */}
              <div className="hero-trust-circles d-flex flex-wrap gap-2 gap-sm-3 mb-4">
                {TRUST_BADGES.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div key={idx} className="trust-circle-item text-center">
                      <div className="trust-circle-icon mx-auto mb-2 shadow-sm">
                        <Icon size={24} />
                      </div>
                      <span className="trust-circle-label fw-bold text-dark">{badge.label}</span>
                    </div>
                  );
                })}
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
                  <Phone size={20} className="text-warning fill-warning" />
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
                  <MessageCircle size={18} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Moving Truck & Delivery Presentation */}
          <div className="col-lg-5">
            <div className="hero-truck-visual position-relative rounded-4 overflow-hidden shadow-xl border bg-white p-2">
              <div className="truck-img-wrapper position-relative rounded-3 overflow-hidden">
                <img
                  src="/images/container-truck-loaded.jpg"
                  alt="Sunrise Packers & Movers Container Carrier Fleet"
                  className="w-100 object-fit-cover hero-visual-main-img"
                />
                <div className="truck-overlay-badge p-3 text-white">
                  <div className="d-flex align-items-center gap-2">
                    <Truck size={22} className="text-warning flex-shrink-0" />
                    <div>
                      <div className="fw-bold small">All-Weather Closed Container Fleet</div>
                      <div className="fs-7 text-silver">Safe Highway Relocation All Across India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Thumbnails Strip with Actual Photos */}
              <div className="row g-2 mt-1">
                <div className="col-4">
                  <div className="thumb-box rounded-2 overflow-hidden position-relative">
                    <img
                      src="/images/truck-open-loading.jpg"
                      alt="Loading operations"
                      className="w-100 object-fit-cover"
                      style={{ height: '75px' }}
                    />
                    <span className="fs-8 text-white position-absolute bottom-0 start-0 w-100 text-center bg-dark bg-opacity-75 py-0">Loading</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="thumb-box rounded-2 overflow-hidden position-relative">
                    <img
                      src="/images/bike-scooter-packing.jpg"
                      alt="Bike packaging"
                      className="w-100 object-fit-cover"
                      style={{ height: '75px' }}
                    />
                    <span className="fs-8 text-white position-absolute bottom-0 start-0 w-100 text-center bg-dark bg-opacity-75 py-0">Bike Pack</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="thumb-box rounded-2 overflow-hidden position-relative">
                    <img
                      src="/images/sofa-cushion-packing.jpg"
                      alt="Sofa protection"
                      className="w-100 object-fit-cover"
                      style={{ height: '75px' }}
                    />
                    <span className="fs-8 text-white position-absolute bottom-0 start-0 w-100 text-center bg-dark bg-opacity-75 py-0">Sofa Pack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
