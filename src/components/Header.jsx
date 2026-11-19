import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="top-notification-bar d-none d-lg-block bg-royal-deep py-1 text-white border-bottom border-secondary border-opacity-25">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center text-silver small">
            <div className="d-flex align-items-center gap-4">
              <span className="d-flex align-items-center gap-1">
                <MapPin size={13} className="text-warning" />
                <span>Service Coverage: <strong>All India</strong></span>
              </span>
              <span className="d-flex align-items-center gap-1">
                <ShieldCheck size={13} className="text-warning" />
                <span>Tagline: <em>{COMPANY_INFO.tagline}</em></span>
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="text-silver hover-white text-decoration-none d-flex align-items-center gap-1"
              >
                <Phone size={13} className="text-primary-light" />
                <span>Call: <strong>{COMPANY_INFO.mobileFormatted}</strong></span>
              </a>
              <span className="text-secondary opacity-50">|</span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover-white text-decoration-none d-flex align-items-center gap-1"
              >
                <MessageCircle size={13} className="text-success" />
                <span>WhatsApp: <strong>{COMPANY_INFO.whatsapp}</strong></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`site-header sticky-top ${isScrolled ? 'scrolled shadow-sm' : ''}`}>
        <div className="container">
          <nav className="navbar navbar-expand-lg py-2 py-lg-3 align-items-center justify-content-between">
            {/* Logo */}
            <Link to="/" className="navbar-brand d-flex align-items-center p-0 m-0" aria-label="Sunrise Packers & Movers">
              <img
                src="/images/logo.jpg"
                alt="Sunrise Packers & Movers - Service All India"
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="d-none d-lg-flex align-items-center gap-1 main-nav-links">
              <NavLink to="/" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Services
              </NavLink>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>
              <NavLink to="/get-quote" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Get Free Quote
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Contact Us
              </NavLink>
            </div>

            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="btn btn-call-icon-outline"
                title={`Call ${COMPANY_INFO.mobileFormatted}`}
              >
                <Phone size={18} />
              </a>
              <Link to="/get-quote" className="btn btn-royal-primary btn-sm px-3 py-2">
                <span>Get Free Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Actions & Toggle */}
            <div className="d-flex d-lg-none align-items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="btn btn-sm btn-call-solid p-2"
                aria-label="Call Now"
              >
                <Phone size={16} />
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-whatsapp-solid p-2"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <button
                type="button"
                className="navbar-toggler-custom border-0 bg-transparent p-2 text-dark"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer d-lg-none ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="p-4 d-flex flex-column gap-3">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Our Services
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Gallery (Photos & Videos)
            </NavLink>
            <NavLink to="/get-quote" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Get Free Quote
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Contact Us
            </NavLink>

            <div className="silver-divider my-2" />

            <div className="mobile-contact-info small text-muted">
              <div className="mb-1 text-dark fw-bold">Sunrise Packers & Movers</div>
              <div className="mb-2">Owner: Praveen Kumar Saket</div>
              <div className="mb-1">Mobile: {COMPANY_INFO.mobileFormatted}</div>
              <div className="mb-3">Address: Juhi Gaon Near Mansarovar Station, New Mumbai</div>
            </div>

            <Link to="/get-quote" className="btn btn-royal-primary w-100 py-2 text-center">
              Get Free Moving Quote
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
