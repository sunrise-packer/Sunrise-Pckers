import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, Phone, MessageCircle, Clock,
  ShieldCheck, HelpCircle, ChevronRight, Truck
} from 'lucide-react';
import SEO from '../components/SEO';
import FAQAccordion from '../components/FAQAccordion';
import { SERVICES } from '../data/services';
import { COMPANY_INFO } from '../data/company';

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-details-page">
      <SEO
        title={`${service.title} | Sunrise Packers & Movers`}
        description={`${service.shortDescription} Door-to-door ${service.title.toLowerCase()} service across all India by Sunrise Packers & Movers.`}
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span className="active">{service.title}</span>
          </nav>
          <h1>{service.title}</h1>
          <p>{service.tagline}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row g-4 g-lg-5">
            {/* Left Content Column */}
            <div className="col-lg-8">
              {/* Featured Image */}
              <div className="service-featured-img-wrap rounded-4 overflow-hidden mb-4 shadow-sm border">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-100 object-fit-cover"
                  style={{ maxHeight: '420px' }}
                />
              </div>

              {/* Comprehensive Description */}
              <div className="service-full-description mb-5">
                <h3 className="fw-bold mb-3">Service Overview</h3>
                <p className="lead text-dark fw-semibold mb-3">
                  {service.shortDescription}
                </p>
                <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.8' }}>
                  {service.fullDescription}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="service-benefits-section mb-5 p-4 rounded-4 bg-light-surface border">
                <h4 className="fw-bold mb-3 text-primary">Key Benefits of Our {service.title}</h4>
                <div className="d-flex flex-column gap-3">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="d-flex align-items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-dark fw-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Process */}
              <div className="service-process-section mb-5">
                <h4 className="fw-bold mb-4">Our {service.title} Working Process</h4>
                <div className="row g-3">
                  {service.process.map((stepItem, idx) => (
                    <div key={idx} className="col-sm-6">
                      <div className="p-3 rounded-3 bg-white border h-100">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="badge bg-royal-primary text-white px-2 py-1 rounded">
                            Step {stepItem.step}
                          </span>
                          <h6 className="fw-bold mb-0 text-dark">{stepItem.title}</h6>
                        </div>
                        <p className="small text-muted mb-0">{stepItem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Specific FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="service-faqs-section mb-4">
                  <h4 className="fw-bold mb-3">Frequently Asked Questions: {service.title}</h4>
                  <FAQAccordion items={service.faqs} defaultOpenIndex={0} />
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-sidebar" style={{ top: '100px' }}>
                {/* Book this service card */}
                <div className="royal-card p-4 mb-4 bg-royal-primary text-white">
                  <h5 className="fw-bold text-white mb-2">Book {service.title}</h5>
                  <p className="small text-silver mb-4">
                    Get an instant customized quotation tailored to your move size and locations.
                  </p>
                  <Link
                    to={`/get-quote?service=${encodeURIComponent(service.title)}`}
                    className="btn btn-warning text-dark fw-bold w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>Calculate Free Quote</span>
                    <ArrowRight size={18} />
                  </Link>
                  <div className="d-flex flex-column gap-2 small">
                    <a
                      href={`tel:${COMPANY_INFO.mobile}`}
                      className="btn btn-outline-light py-2 d-flex align-items-center justify-content-center gap-2"
                    >
                      <Phone size={16} /> Call: {COMPANY_INFO.mobileFormatted}
                    </a>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi, I am interested in ${service.title} with Sunrise Packers & Movers. Please share quote details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp-solid py-2 d-flex align-items-center justify-content-center gap-2"
                    >
                      <MessageCircle size={16} /> WhatsApp Inquiry
                    </a>
                  </div>
                </div>

                {/* Other Services Navigation List */}
                <div className="royal-card p-4 mb-4">
                  <h6 className="fw-bold text-dark mb-3 text-uppercase fs-7 letter-spacing-1">
                    Other Moving Services
                  </h6>
                  <ul className="list-unstyled mb-0 small">
                    {SERVICES.filter((s) => s.id !== service.id).slice(0, 8).map((other) => (
                      <li key={other.id} className="mb-2">
                        <Link
                          to={`/services/${other.slug}`}
                          className="d-flex justify-content-between align-items-center py-2 px-3 rounded text-dark hover-primary border"
                        >
                          <span>{other.title}</span>
                          <ChevronRight size={16} className="text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-center">
                    <Link to="/services" className="text-primary small fw-semibold">
                      View All 12 Services →
                    </Link>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="p-3 rounded-3 bg-light border text-center small text-muted">
                  <ShieldCheck size={28} className="text-primary mx-auto mb-2" />
                  <div className="fw-bold text-dark mb-1">Sunrise Guarantee</div>
                  <div>"Your Belongings..... Our Responsibility" — Service All India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
