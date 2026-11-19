import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, ChevronRight, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { SERVICES } from '../data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-royal-deep text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Col 1: Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <Link to="/" className="d-inline-block bg-white p-2 rounded-3 mb-3">
                <img
                  src="/images/logo.jpg"
                  alt="Sunrise Packers & Movers Logo"
                  style={{ maxHeight: '56px', width: 'auto' }}
                />
              </Link>
              <h5 className="text-white fw-bold mb-1">{COMPANY_INFO.name}</h5>
              <p className="text-warning small fst-italic mb-3">"{COMPANY_INFO.tagline}"</p>
              <p className="text-silver small pe-lg-3">
                Reliable packers and movers offering careful household packing, office shifting, vehicle transportation, and safe relocation services across all states of India.
              </p>
              <div className="text-silver small">
                <strong>Owner:</strong> {COMPANY_INFO.owner}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title text-white fw-bold mb-3 text-uppercase fs-7 letter-spacing-1">
              Quick Links
            </h6>
            <ul className="list-unstyled footer-links small">
              <li className="mb-2">
                <Link to="/" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Our Services
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/gallery" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Photo & Video Gallery
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/get-quote" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Get Free Quote
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-title text-white fw-bold mb-3 text-uppercase fs-7 letter-spacing-1">
              Our Services
            </h6>
            <ul className="list-unstyled footer-links small">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id} className="mb-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-silver hover-white d-inline-flex align-items-center gap-1"
                  >
                    <ChevronRight size={14} className="text-warning" /> {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-warning fw-semibold d-inline-flex align-items-center gap-1 mt-1">
                  View All 12 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Address */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title text-white fw-bold mb-3 text-uppercase fs-7 letter-spacing-1">
              Contact & Office
            </h6>
            <ul className="list-unstyled footer-contact-info small text-silver">
              <li className="mb-3 d-flex align-items-start gap-2">
                <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
                <span>
                  <strong>Office Address:</strong><br />
                  {COMPANY_INFO.address}
                </span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Phone size={16} className="text-primary-light flex-shrink-0" />
                <span>
                  <strong>Call:</strong>{' '}
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="text-white text-decoration-none">
                    {COMPANY_INFO.mobileFormatted}
                  </a>
                </span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <MessageCircle size={16} className="text-success flex-shrink-0" />
                <span>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                </span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={16} className="text-warning flex-shrink-0" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-white text-decoration-none">
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </li>
              <li className="mt-2">
                <div className="p-2 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25 small text-silver">
                  <ShieldCheck size={14} className="text-success me-1" />
                  <strong>Service Coverage:</strong> All India Local & Inter-State
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Silver Separator */}
        <hr className="border-secondary opacity-25 my-3" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-silver pt-2">
          <div>
            © {currentYear} <strong>{COMPANY_INFO.name}</strong>. All Rights Reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Owner: <strong>{COMPANY_INFO.owner}</strong></span>
            <span>•</span>
            <Link to="/privacy-policy" className="text-silver hover-white">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/contact" className="text-silver hover-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
