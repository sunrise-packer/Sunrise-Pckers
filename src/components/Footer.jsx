import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, ChevronRight, Heart } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-royal-deep text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Col 1: Brand Logo & Tagline */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <Link to="/" className="d-inline-block bg-white p-2 rounded-3 mb-3 shadow-sm">
                <img
                  src="/images/logo.jpg"
                  alt="Sunrise Packers & Movers Logo"
                  style={{ maxHeight: '54px', width: 'auto' }}
                />
              </Link>
              <h5 className="text-white fw-bold mb-1">{COMPANY_INFO.name}</h5>
              <p className="text-warning small fst-italic mb-3">"{COMPANY_INFO.tagline}"</p>
              <p className="text-silver small pe-lg-3">
                Professional and reliable moving company offering careful household packing, office relocation, vehicle transportation, and safe delivery across all states of India.
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
                <a href="#process-section" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Our Process
                </a>
              </li>
              <li className="mb-2">
                <a href="#testimonials-section" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Testimonials
                </a>
              </li>
              <li className="mb-2">
                <Link to="/gallery" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Gallery
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

          {/* Col 3: Our Services */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-title text-white fw-bold mb-3 text-uppercase fs-7 letter-spacing-1">
              Our Services
            </h6>
            <ul className="list-unstyled footer-links small">
              <li className="mb-2">
                <Link to="/services/home-shifting" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Household Shifting
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/office-shifting" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Office Relocation
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/car-transportation" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Car Transportation
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/bike-transportation" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Bike Transportation
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/packing-moving" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Packing & Moving
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services/storage-warehousing" className="text-silver hover-white d-inline-flex align-items-center gap-1">
                  <ChevronRight size={14} className="text-warning" /> Warehousing & Storage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title text-white fw-bold mb-3 text-uppercase fs-7 letter-spacing-1">
              Contact Us
            </h6>
            <ul className="list-unstyled footer-contact-info small text-silver">
              <li className="mb-3 d-flex align-items-start gap-2">
                <Phone size={16} className="text-warning flex-shrink-0 mt-1" />
                <span>
                  <strong>+91 {COMPANY_INFO.mobile}</strong><br />
                  <small className="text-silver">Available 24/7 for moving assistance</small>
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start gap-2">
                <MapPin size={16} className="text-warning flex-shrink-0 mt-1" />
                <span>
                  {COMPANY_INFO.address}
                </span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={16} className="text-warning flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white text-decoration-none">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-secondary opacity-25 my-2" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-silver pt-2">
          <div>
            © {currentYear} <strong>{COMPANY_INFO.name}</strong>. All Rights Reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Designed with <Heart size={14} className="text-danger fill-danger" /> for a Better Tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
