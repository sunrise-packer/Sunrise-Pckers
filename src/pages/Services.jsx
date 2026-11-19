import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../data/services';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICES.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services-page">
      <SEO
        title="Our Services | Sunrise Packers & Movers"
        description="Explore all 12 specialized packing, home shifting, office relocation, vehicle transportation, warehousing, and commercial transport services by Sunrise Packers & Movers across India."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Our Services</span>
          </nav>
          <h1>Comprehensive Moving & Relocation Services</h1>
          <p>
            From single-room local shifting to nationwide vehicle transit and corporate moves, discover our 12 specialized relocation solutions across India.
          </p>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          {/* Search / Filter bar */}
          <div className="row justify-content-between align-items-center mb-5 g-3">
            <div className="col-md-6">
              <span className="section-badge">12 Specialized Services</span>
              <h2 className="section-title text-start mb-0">What Are You Looking to Move?</h2>
            </div>
            <div className="col-md-5 col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-1"
                  placeholder="Search shifting service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="row g-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="col-12 col-md-6 col-lg-4">
                <ServiceCard service={service} />
              </div>
            ))}
            {filteredServices.length === 0 && (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-5">No service matched "{searchTerm}".</p>
                <button
                  type="button"
                  className="btn btn-royal-outline btn-sm"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Standards Banner */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="royal-card p-4 p-lg-5 bg-royal-primary text-white">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="badge bg-warning text-dark px-3 py-1 rounded-pill mb-2">
                  Quality Standards
                </span>
                <h3 className="text-white fw-bold mb-3">
                  Every Move Backed By Multi-Layer Protective Packaging
                </h3>
                <p className="text-silver mb-3">
                  We don't cut corners on packaging supplies. Every move includes virgin corrugated boxes, bubble wrapping for fragile electronics, and weather-sealed transit containers.
                </p>
                <div className="d-flex flex-wrap gap-3 small text-silver">
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> Door-to-Door Delivery
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> Zero Hidden Charges
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> 24/7 Transit Updates
                  </span>
                </div>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link to="/get-quote" className="btn btn-warning text-dark fw-bold px-4 py-3">
                  Get Free Moving Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
