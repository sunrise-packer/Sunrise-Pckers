import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, MapPin, Calculator, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToQuote = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('quote-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/get-quote');
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <>
      {/* Top Contact Information Bar (Matching Reference Design) */}
      <div className="top-contact-bar bg-royal-deep py-2 text-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center small flex-wrap gap-2">
            {/* Left: Office Address */}
            <div className="d-flex align-items-center gap-2 text-silver header-address-text">
              <MapPin size={15} className="text-warning flex-shrink-0" />
              <span>{COMPANY_INFO.address}</span>
            </div>

            {/* Right: Phone Number */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="text-white text-decoration-none d-flex align-items-center gap-2 fw-semibold"
              >
                <Phone size={14} className="text-warning flex-shrink-0" />
                <span>+91 {COMPANY_INFO.mobile}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`site-header sticky-top ${isScrolled ? 'scrolled shadow-sm' : ''}`}>
        <div className="container">
          <nav className="navbar navbar-expand-lg py-2 align-items-center justify-content-between">
            {/* Logo */}
            <Link to="/" className="navbar-brand d-flex align-items-center p-0 m-0" aria-label="Sunrise Packers & Movers">
              <img
                src="/images/logo.jpg"
                alt="Sunrise Packers & Movers - Service all India"
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links (Order from Reference Image) */}
            <div className="d-none d-lg-flex align-items-center gap-1 main-nav-links">
              <NavLink to="/" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Our Services
              </NavLink>
              <a
                href="#process-section"
                onClick={(e) => scrollToSection(e, 'process-section')}
                className="nav-link-custom"
              >
                Our Process
              </a>
              <a
                href="#testimonials-section"
                onClick={(e) => scrollToSection(e, 'testimonials-section')}
                className="nav-link-custom"
              >
                Testimonials
              </a>
              <a
                href="#faq-section"
                onClick={(e) => scrollToSection(e, 'faq-section')}
                className="nav-link-custom"
              >
                FAQs
              </a>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                Contact Us
              </NavLink>
            </div>

            {/* Desktop Action: Get Free Quote Yellow Pill Button */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <a
                href="#quote-section"
                onClick={scrollToQuote}
                className="btn btn-quote-pill shadow-sm"
              >
                <MessageCircle size={16} />
                <span>Get Free Quote</span>
              </a>
            </div>

            {/* Mobile Actions & Hamburger */}
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
          <div className="p-4 d-flex flex-column gap-2">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Our Services
            </NavLink>
            <a
              href="#process-section"
              onClick={(e) => scrollToSection(e, 'process-section')}
              className="mobile-nav-link"
            >
              Our Process
            </a>
            <a
              href="#testimonials-section"
              onClick={(e) => scrollToSection(e, 'testimonials-section')}
              className="mobile-nav-link"
            >
              Testimonials
            </a>
            <a
              href="#faq-section"
              onClick={(e) => scrollToSection(e, 'faq-section')}
              className="mobile-nav-link"
            >
              FAQs
            </a>
            <NavLink to="/gallery" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
              Contact Us
            </NavLink>

            <div className="silver-divider my-2" />

            <div className="mobile-contact-info small text-muted">
              <div className="text-dark fw-bold">{COMPANY_INFO.name}</div>
              <div className="text-primary fw-semibold">Owner: {COMPANY_INFO.owner}</div>
              <div>Mo: {COMPANY_INFO.mobileFormatted}</div>
              <div className="mt-1 fs-7">{COMPANY_INFO.address}</div>
            </div>

            <a
              href="#quote-section"
              onClick={scrollToQuote}
              className="btn btn-quote-pill w-100 py-2 text-center mt-2"
            >
              Get Free Moving Quote
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
