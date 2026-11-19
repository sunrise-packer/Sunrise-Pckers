import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Phone, MessageCircle, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import QuoteForm from '../components/QuoteForm';
import { COMPANY_INFO } from '../data/company';

export default function GetQuote() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultService = searchParams.get('service');

  return (
    <div className="get-quote-page">
      <SEO
        title="Get Free Moving Quote | Sunrise Packers & Movers"
        description="Calculate and receive an instant moving quotation from Sunrise Packers & Movers. Interactive service selector, Google Maps location finder, and instant WhatsApp estimate generator."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Get Free Quote</span>
          </nav>
          <h1>Get Your Free Moving Quotation</h1>
          <p>
            Fill in your move details below to receive an accurate, transparent, and obligation-free moving estimate directly via WhatsApp or phone.
          </p>
        </div>
      </div>

      {/* Main Form Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Form Column */}
            <div className="col-lg-9">
              <QuoteForm defaultService={defaultService} />
            </div>

            {/* Sidebar Assurance Column */}
            <div className="col-lg-3">
              <div className="quote-sidebar d-flex flex-column gap-3">
                {/* Contact Card */}
                <div className="royal-card p-3 bg-white">
                  <h6 className="fw-bold mb-2">Prefer to Talk Directly?</h6>
                  <p className="small text-muted mb-3">
                    You can speak directly with owner Praveen Kumar Saket for instant rate estimates.
                  </p>
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="btn btn-call-solid w-100 py-2 small mb-2">
                    <Phone size={14} /> Call {COMPANY_INFO.mobileFormatted}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp-solid w-100 py-2 small"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                </div>

                {/* Assurance Card */}
                <div className="royal-card p-3 bg-white">
                  <h6 className="fw-bold mb-2">The Sunrise Promise</h6>
                  <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2">
                    <li className="d-flex align-items-start gap-2">
                      <ShieldCheck size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>No Hidden Charges:</strong> All packing, vehicle transport & labor costs stated clearly upfront.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <ShieldCheck size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>All India Delivery:</strong> Direct closed container transport across all Indian states.</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <ShieldCheck size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span><strong>Personal Accountability:</strong> Monitored directly by Praveen Kumar Saket.</span>
                    </li>
                  </ul>
                </div>

                {/* Address Card */}
                <div className="royal-card p-3 bg-white small text-muted">
                  <div className="fw-bold text-dark mb-1">Office Location</div>
                  <p className="mb-0 fs-7">
                    Juhi Gaon Hanuman Mandir Kamautha Top Number 2, Near Mansarovar Station, New Mumbai, Maharashtra 410206.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
