import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, MessageCircle, ArrowRight, ShieldCheck, Truck, CheckCircle2,
  Calendar, MapPin, Award, Clock, ArrowUpRight, Play
} from 'lucide-react';
import SEO from '../components/SEO';
import TrustHighlights from '../components/TrustHighlights';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import FAQAccordion from '../components/FAQAccordion';
import { COMPANY_INFO } from '../data/company';
import { SERVICES } from '../data/services';
import { GALLERY_ITEMS } from '../data/gallery';
import { GENERAL_FAQS } from '../data/faqs';

export default function Home() {
  const featuredServices = SERVICES.slice(0, 6);
  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  return (
    <div className="home-page">
      <SEO
        title="Reliable Packers & Movers Across India"
        description="Sunrise Packers & Movers - Safe home shifting, office relocation, vehicle transportation, and domestic packing across all states of India. Owned by Praveen Kumar Saket. Call 8517952427."
      />

      {/* SECTION 1: HERO BANNER */}
      <section className="hero-banner-section position-relative overflow-hidden">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5 py-5">
            {/* Hero Text */}
            <div className="col-lg-7">
              <div className="hero-content pe-lg-4">
                <div className="hero-tagline-badge d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill">
                  <ShieldCheck size={16} className="text-warning" />
                  <span className="small fw-bold text-uppercase letter-spacing-1">
                    {COMPANY_INFO.name}
                  </span>
                </div>

                <h1 className="hero-headline display-4 fw-extrabold mb-3">
                  Reliable Packers & Movers Across India
                </h1>

                <p className="hero-motto fw-semibold fs-5 text-warning mb-3">
                  "{COMPANY_INFO.tagline}"
                </p>

                <p className="hero-supporting-text lead text-silver mb-4">
                  From careful packing to safe transportation and timely delivery, we make every move simple, secure and stress-free.
                </p>

                {/* Hero Action Buttons */}
                <div className="hero-btn-group d-flex flex-wrap gap-3 mb-4">
                  <Link to="/get-quote" className="btn btn-royal-primary px-4 py-3 fs-6">
                    <span>Get Free Quote</span>
                    <ArrowRight size={18} />
                  </Link>

                  <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-call-solid px-4 py-3 fs-6">
                    <Phone size={18} />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-solid px-4 py-3 fs-6"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Us</span>
                  </a>
                </div>

                {/* Quick Trust Points */}
                <div className="hero-perks d-flex flex-wrap gap-4 pt-3 border-top border-secondary border-opacity-25 small text-silver">
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> All India Coverage
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> Multi-Layer Packing
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <CheckCircle2 size={16} className="text-warning" /> Closed Container Fleet
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image / Moving Visual */}
            <div className="col-lg-5">
              <div className="hero-visual-card position-relative p-2 rounded-4 bg-white shadow-xl">
                <img
                  src="/images/container-truck-loaded.jpg"
                  alt="Sunrise Packers & Movers Container Truck Fully Loaded"
                  className="rounded-4 w-100 object-fit-cover hero-img"
                />
                <div className="hero-floating-badge p-3 rounded-3 bg-royal-primary text-white shadow-lg">
                  <div className="d-flex align-items-center gap-2">
                    <Truck size={22} className="text-warning" />
                    <div>
                      <div className="fw-bold small">Service Coverage</div>
                      <div className="fs-7 text-silver">All Over India Doorstep Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST HIGHLIGHTS */}
      <TrustHighlights />

      {/* SECTION 3: OUR SERVICES */}
      <section className="services-overview-section section-padding bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Tailored Relocation</span>
            <h2 className="section-title">Our Moving & Packing Services</h2>
            <p className="section-desc">
              Whether you are relocating household furniture, corporate offices, vehicles, or commercial merchandise, Sunrise Packers & Movers delivers end-to-end relocation solutions.
            </p>
          </div>

          <div className="row g-4">
            {featuredServices.map((service) => (
              <div key={service.id} className="col-12 col-md-6 col-lg-4">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/services" className="btn btn-royal-outline px-4 py-2">
              <span>Explore All 12 Moving Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: ABOUT SUNRISE */}
      <section className="about-preview-section section-padding">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="about-visual-grid position-relative">
                <img
                  src="/images/truck-open-loading.jpg"
                  alt="Sunrise Packers & Movers loading goods into truck"
                  className="rounded-4 shadow-md w-100 mb-3"
                />
                <div className="row g-2">
                  <div className="col-6">
                    <img
                      src="/images/bike-scooter-packing.jpg"
                      alt="Bike multi-layer wrapping"
                      className="rounded-3 shadow-sm w-100 object-fit-cover"
                      style={{ height: '140px' }}
                    />
                  </div>
                  <div className="col-6">
                    <img
                      src="/images/appliance-packing.jpg"
                      alt="Appliance shrink wrapping"
                      className="rounded-3 shadow-sm w-100 object-fit-cover"
                      style={{ height: '140px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-text-wrap ps-lg-3">
                <span className="section-badge">About Sunrise</span>
                <h2 className="section-title text-start mb-3">
                  Dedicated to Safe & Reliable Relocation
                </h2>

                <p className="lead text-dark fw-semibold mb-3">
                  "{COMPANY_INFO.tagline}"
                </p>

                <p className="text-muted mb-3">
                  Sunrise Packers & Movers is an Indian relocation service provider managed personally by <strong>{COMPANY_INFO.owner}</strong>. Based near Mansarovar Station in New Mumbai, Maharashtra, our service operations span all across India.
                </p>

                <p className="text-muted mb-4">
                  We believe that moving should not be stressful. By focusing on disciplined packing materials, careful lifting techniques, and closed container transportation, we ensure your household belongings and vehicles reach their destination safe and sound.
                </p>

                <div className="about-core-pillars row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-light border">
                      <div className="fw-bold text-primary mb-1">Careful Handling</div>
                      <div className="small text-muted">Special attention to fragile glassware, mirrors, and electronic appliances.</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-light border">
                      <div className="fw-bold text-primary mb-1">Organized Logistics</div>
                      <div className="small text-muted">Systematic room-wise labeling and planned container loading schedules.</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-light border">
                      <div className="fw-bold text-primary mb-1">Customer Support</div>
                      <div className="small text-muted">Direct communication with our moving coordinators from start to finish.</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 rounded-3 bg-light border">
                      <div className="fw-bold text-primary mb-1">All India Transit</div>
                      <div className="small text-muted">Reliable route connections between Maharashtra and all Indian states.</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <Link to="/about" className="btn btn-royal-primary">
                    <span>Know More About Us</span>
                    <ArrowRight size={18} />
                  </Link>
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-royal-outline">
                    <Phone size={16} />
                    <span>Call Owner: {COMPANY_INFO.mobile}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="how-it-works-section section-padding bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Step-by-Step Flow</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">
              A transparent, 5-step process designed to give you peace of mind from initial enquiry to final box delivery.
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      {/* SECTION 6: GALLERY PREVIEW */}
      <section className="gallery-preview-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Real Ground Works</span>
            <h2 className="section-title">Packing & Moving Gallery Preview</h2>
            <p className="section-desc">
              Explore authentic photos and video footage of our actual packing, container loading, and vehicle transport operations.
            </p>
          </div>

          <div className="row g-3 g-md-4">
            {previewGallery.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                <Link to="/gallery" className="gallery-card-preview text-decoration-none">
                  <div className="gallery-thumb-wrap position-relative rounded-4 overflow-hidden border">
                    {item.type === 'video' ? (
                      <div className="video-thumb-container position-relative">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-100 object-fit-cover gallery-img"
                          style={{ height: '240px' }}
                        />
                        <div className="video-play-overlay">
                          <Play size={28} className="text-white fill-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-100 object-fit-cover gallery-img"
                        style={{ height: '240px' }}
                        loading="lazy"
                      />
                    )}
                    <div className="gallery-thumb-caption p-3">
                      <div className="badge bg-primary mb-1 small">{item.category}</div>
                      <h6 className="text-white mb-0 fw-bold">{item.title}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/gallery" className="btn btn-royal-primary px-4 py-2">
              <span>View Complete Gallery (Photos & Videos)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMER COMMITMENT & TESTIMONIALS PLACEHOLDER */}
      <section className="testimonials-section section-padding bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Commitment</span>
            <h2 className="section-title">Customer Satisfaction First</h2>
            <p className="section-desc">
              At Sunrise Packers & Movers, every move is treated with genuine accountability.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="royal-card text-center p-4 p-md-5">
                <div className="mb-3">
                  <span className="badge bg-primary-soft text-primary px-3 py-2 fs-6 rounded-pill">
                    Genuine Work Ethic
                  </span>
                </div>
                <h4 className="fw-bold mb-3">
                  "Your Belongings..... Our Responsibility"
                </h4>
                <p className="text-muted fs-6 mb-4">
                  We take genuine pride in transparent dealings and real moving assistance without making inflated claims or displaying unverified reviews. When you hire Sunrise Packers & Movers, owner <strong>Praveen Kumar Saket</strong> and our team take personal responsibility for the safety of your belongings.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/get-quote" className="btn btn-royal-primary">
                    Request Your Move
                  </Link>
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-royal-outline">
                    Speak with Us Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="faq-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Frequently Asked Questions</span>
            <h2 className="section-title">Got Questions? We Have Answers</h2>
            <p className="section-desc">
              Common questions answered to help you plan your moving journey smoothly.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <FAQAccordion items={GENERAL_FAQS} defaultOpenIndex={0} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION */}
      <section className="final-cta-section py-5 bg-royal-primary text-white text-center position-relative overflow-hidden">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-3 text-uppercase">
                Start Your Move Today
              </span>
              <h2 className="text-white display-5 fw-extrabold mb-3">
                Planning Your Next Move?
              </h2>
              <p className="lead text-silver mb-4">
                Let Sunrise Packers & Movers help you make your relocation simple, secure and convenient.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/get-quote" className="btn btn-warning text-dark fw-bold px-4 py-3 fs-6">
                  Get Free Quote
                </Link>
                <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-outline-light px-4 py-3 fs-6">
                  <Phone size={18} />
                  Call Now: {COMPANY_INFO.mobile}
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid px-4 py-3 fs-6"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
