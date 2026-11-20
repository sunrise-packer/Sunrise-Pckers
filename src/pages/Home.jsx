import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, Play, ZoomIn } from 'lucide-react';
import SEO from '../components/SEO';
import HomeHero from '../components/HomeHero';
import HomeServices from '../components/HomeServices';
import HomeAboutWhy from '../components/HomeAboutWhy';
import HomeTestimonials from '../components/HomeTestimonials';
import TrustStats from '../components/TrustStats';
import HomeQuoteSection from '../components/HomeQuoteSection';
import ProcessSteps from '../components/ProcessSteps';
import FAQAccordion from '../components/FAQAccordion';
import { COMPANY_INFO } from '../data/company';
import { GALLERY_ITEMS } from '../data/gallery';
import { GENERAL_FAQS } from '../data/faqs';

export default function Home() {
  const scrollToQuote = () => {
    const el = document.getElementById('quote-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const previewGallery = GALLERY_ITEMS.slice(0, 6);

  return (
    <div className="home-page">
      <SEO
        title="Reliable Packers & Movers Across India"
        description="Sunrise Packers & Movers - Your Belongings..... Our Responsibility. Safe household shifting, corporate moves, vehicle transportation across All India. Owner: Praveen Kumar Saket."
      />

      {/* 3. LARGE HERO BANNER */}
      <HomeHero onQuoteClick={scrollToQuote} />

      {/* 4. OUR SERVICES (6 IN A ROW ON DESKTOP) */}
      <HomeServices />

      {/* 5 & 6. ABOUT US + WHY CHOOSE US + VIDEO PREVIEW */}
      <HomeAboutWhy />

      {/* 7. CUSTOMER TESTIMONIALS */}
      <HomeTestimonials />

      {/* 7B. TRUST & CUSTOMER RATING STATISTICS */}
      <TrustStats />

      {/* 8. GET FREE QUOTE FORM (ON HOMEPAGE — STRICT QUOTE RULE: NO AUTO CALCULATOR) */}
      <HomeQuoteSection />

      {/* 9. HOW IT WORKS */}
      <section id="process-section" className="how-it-works-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Step-by-Step Flow</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">
              A transparent, 5-step relocation workflow designed for maximum peace of mind.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* 10. GALLERY PREVIEW */}
      <section className="gallery-preview-section py-5 bg-light-surface">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Real Proof of Work</span>
            <h2 className="section-title">Work Gallery Preview</h2>
            <p className="section-desc">
              Authentic on-site photographs and ground footage of our packing, loading, and vehicle transport operations.
            </p>
          </div>

          <div className="row g-3 g-md-4 mb-4">
            {previewGallery.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                <Link to="/gallery" className="gallery-card-preview text-decoration-none">
                  <div className="gallery-thumb-wrap position-relative rounded-4 overflow-hidden border bg-white shadow-sm">
                    {item.type === 'video' ? (
                      <div className="position-relative">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-100 object-fit-cover"
                          style={{ height: '240px' }}
                        />
                        <div className="video-badge-overlay">
                          <Play size={24} className="fill-white text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-100 object-fit-cover"
                        style={{ height: '240px' }}
                        loading="lazy"
                      />
                    )}
                    <div className="gallery-thumb-caption p-3">
                      <span className="badge bg-primary text-uppercase mb-1 small">{item.category}</span>
                      <h6 className="text-white mb-0 fw-bold fs-7">{item.title}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery" className="btn btn-royal-primary px-4 py-2">
              <span>View Complete Gallery (Photos & Videos)</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section id="faq-section" className="faq-section py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
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

      {/* 12. FINAL CALL TO ACTION (FULL-WIDTH ROYAL PURPLE) */}
      <section className="final-cta-section py-5 bg-royal-primary text-white text-center position-relative overflow-hidden">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="text-white display-5 fw-extrabold mb-3">
                Planning Your Next Move?
              </h2>
              <p className="lead text-silver mb-4">
                Let Sunrise Packers & Movers make your relocation simple and convenient.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="btn btn-quote-pill px-4 py-3 fs-6 shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>Get Free Quote</span>
                </button>
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-royal-outline-light px-4 py-3 fs-6"
                >
                  <Phone size={18} />
                  <span>Call Now: {COMPANY_INFO.mobile}</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid px-4 py-3 fs-6 shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
