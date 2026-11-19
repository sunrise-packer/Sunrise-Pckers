import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, CheckCircle2, User, Phone, MapPin, Globe,
  ArrowRight, Award, Target, Eye, Truck, PackageCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import { COMPANY_INFO } from '../data/company';

export default function About() {
  return (
    <div className="about-page">
      <SEO
        title="About Us | Sunrise Packers & Movers"
        description="Learn about Sunrise Packers & Movers, led by Praveen Kumar Saket. Professional household packing, corporate shifting, vehicle transportation, and safe delivery across India."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">About Us</span>
          </nav>
          <h1>About Sunrise Packers & Movers</h1>
          <p>
            "{COMPANY_INFO.tagline}" — Built on integrity, careful handling, and dependable relocation services all across India.
          </p>
        </div>
      </div>

      {/* Company Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <span className="section-badge">Company Introduction</span>
              <h2 className="section-title text-start mb-3">
                Your Trusted Moving Partner Across All India
              </h2>
              <p className="lead text-dark fw-semibold mb-3">
                Managed personally by Praveen Kumar Saket, Sunrise Packers & Movers is dedicated to delivering transparent and dependable relocation services.
              </p>
              <p className="text-muted mb-3">
                Relocating home or business is more than moving physical boxes — it represents a major life transition. At Sunrise Packers & Movers, our core philosophy is reflected in our tagline: <strong>"Your Belongings..... Our Responsibility"</strong>. We respect the emotional and monetary value attached to every piece of furniture, family heirloom, electronic appliance, and commercial item entrusted to us.
              </p>
              <p className="text-muted mb-4">
                Operating from our main office near Mansarovar Station in New Mumbai, Maharashtra, we coordinate moves locally within the Mumbai metropolitan region as well as long-distance inter-state moves spanning North, South, East, and Western corridors of India.
              </p>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 p-2 rounded bg-light border">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="small fw-semibold">Praveen Kumar Saket (Owner)</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 p-2 rounded bg-light border">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="small fw-semibold">All India Service Coverage</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 p-2 rounded bg-light border">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="small fw-semibold">Direct Driver & Crew Contact</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-2 p-2 rounded bg-light border">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="small fw-semibold">Multi-Layer Protective Packing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-collage position-relative">
                <img
                  src="/images/truck-open-loading.jpg"
                  alt="Sunrise Packers & Movers loading goods"
                  className="rounded-4 shadow-md w-100 mb-3"
                />
                <div className="row g-2">
                  <div className="col-6">
                    <img
                      src="/images/sofa-cushion-packing.jpg"
                      alt="Careful sofa wrapping"
                      className="rounded-3 shadow-sm w-100 object-fit-cover"
                      style={{ height: '160px' }}
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="/images/movenxt-cartons-film.jpg"
                      alt="Quality packing supplies"
                      className="rounded-3 shadow-sm w-100 object-fit-cover"
                      style={{ height: '160px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="royal-card p-4 p-lg-5 h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="p-3 rounded-circle bg-primary-soft text-primary">
                    <Target size={30} />
                  </div>
                  <h3 className="fw-bold mb-0">Our Mission</h3>
                </div>
                <p className="text-muted mb-0">
                  To provide safe, transparent, and stress-free relocation solutions across India. We aim to protect every client's belongings with rigorous multi-layer packing standards, honest pricing, punctual timelines, and respectful customer service.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="royal-card p-4 p-lg-5 h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="p-3 rounded-circle bg-primary-soft text-primary">
                    <Eye size={30} />
                  </div>
                  <h3 className="fw-bold mb-0">Our Vision</h3>
                </div>
                <p className="text-muted mb-0">
                  To establish Sunrise Packers & Movers as the most dependable and customer-recommended relocation company in India — recognized for genuine service quality, zero hidden charges, and authentic care for our customers' precious possessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Introduction & Commitment */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-5">
              <div className="owner-card royal-card text-center p-4 p-lg-5">
                <div className="owner-avatar-circle mx-auto mb-3 bg-royal-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '100px', height: '100px' }}>
                  <User size={48} />
                </div>
                <h4 className="fw-bold mb-1 text-primary">{COMPANY_INFO.owner}</h4>
                <div className="badge bg-warning text-dark px-3 py-1 rounded-pill mb-3">
                  Owner & Founder
                </div>
                <p className="small text-muted mb-4">
                  Sunrise Packers & Movers is personally overseen by Praveen Kumar Saket to ensure consistent quality, disciplined handling, and prompt customer responsiveness.
                </p>
                <div className="d-flex flex-column gap-2 small">
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-call-solid py-2">
                    <Phone size={16} /> Direct Call: {COMPANY_INFO.mobileFormatted}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-solid py-2"
                  >
                    WhatsApp: {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="ps-lg-3">
                <span className="section-badge">Our Commitment</span>
                <h2 className="section-title text-start mb-3">
                  Why Choose Sunrise Packers & Movers?
                </h2>
                <p className="text-muted mb-4">
                  We distinguish ourselves by avoiding unrealistic promotional claims. Here is what we realistically deliver on every single assignment:
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                    <ShieldCheck size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="fw-bold mb-1">Authentic Care for Every Item</h6>
                      <p className="small text-muted mb-0">
                        Whether it is a heavy double bed, modular kitchen crockery, or your daily commuter bike, our crew wraps each item using high-grade bubble film and corrugated cushioning.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                    <Truck size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="fw-bold mb-1">Closed Container Vehicles</h6>
                      <p className="small text-muted mb-0">
                        We deploy weather-sealed closed container carriers that shield your packed belongings from heavy rain, highway dust, and adverse weather conditions.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                    <Globe size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="fw-bold mb-1">Pan-India Transit Network</h6>
                      <p className="small text-muted mb-0">
                        We facilitate seamless relocation between Maharashtra, Gujarat, Delhi NCR, Karnataka, Telangana, Madhya Pradesh, Uttar Pradesh, and all states across India.
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/get-quote" className="btn btn-royal-primary px-4 py-2">
                  <span>Get Your Moving Quote</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Location Details */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="section-badge">Head Office</span>
              <h3 className="fw-bold mb-3">Conveniently Located in New Mumbai</h3>
              <p className="text-muted mb-4">
                Our main dispatch and operational facility is located at:
              </p>
              <div className="p-4 rounded-4 bg-white border shadow-sm text-start mb-4">
                <div className="d-flex align-items-start gap-3">
                  <MapPin size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="fw-bold mb-1">{COMPANY_INFO.name}</h6>
                    <p className="text-muted mb-2">{COMPANY_INFO.address}</p>
                    <div className="small text-secondary">
                      <strong>Landmark:</strong> Near Mansarovar Station & Juhi Gaon Hanuman Mandir
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn btn-royal-outline">
                View Contact Page & Interactive Map
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
