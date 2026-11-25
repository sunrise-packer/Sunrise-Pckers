import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { COMPANY_INFO } from '../data/company';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      <SEO
        title="Privacy Policy | Sunrise Packers & Movers"
        description="Privacy policy of Sunrise Packers & Movers. Learn how we handle your moving enquiry details, location information, and contact data with complete confidentiality."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Privacy Policy</span>
          </nav>
          <h1>Privacy Policy</h1>
          <p>
            Your trust is paramount. Learn how Sunrise Packers & Movers safeguards your personal contact and relocation data.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="royal-card p-4 p-md-5 bg-white">
                <div className="d-flex align-items-center gap-2 mb-4 text-muted small">
                  <ShieldCheck size={18} className="text-primary" />
                  <span>Last Updated: November 2026 | Effective for all website visitors & customers</span>
                </div>

                <div className="privacy-content d-flex flex-column gap-4 text-muted">
                  <div>
                    <h4 className="fw-bold text-dark mb-2">1. Overview & Commitment</h4>
                    <p>
                      <strong>{COMPANY_INFO.name}</strong>, owned and operated by <strong>{COMPANY_INFO.owner}</strong>, operates the business website located at www.sunrisepackersmovers.in. We are committed to protecting the privacy of our customers and visitors. We do not sell, rent, trade, or distribute your personal contact information to third-party telemarketers or external advertising networks.
                    </p>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">2. Information We Collect</h4>
                    <p>When you submit a moving enquiry or use our quote calculator, we collect only the necessary details required to assess your relocation requirements:</p>
                    <ul className="mb-2">
                      <li><strong>Contact Information:</strong> Your Full Name, Mobile/WhatsApp Phone Number, and Optional Email Address.</li>
                      <li><strong>Moving Locations:</strong> Pickup address or city, and destination address or city.</li>
                      <li><strong>Move Specifications:</strong> Preferred moving date, property size (e.g. 1 BHK, 2 BHK), floor details, elevator availability, and approximate household items.</li>
                      <li><strong>Geographical Coordinates:</strong> When you voluntarily use the GPS geolocation or interactive Google Map picker, coordinates are used strictly to identify the correct pickup or destination address.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">3. Purpose of Using Your Information</h4>
                    <p>We use the submitted information solely to:</p>
                    <ul className="mb-2">
                      <li>Prepare an accurate, obligation-free moving price estimate.</li>
                      <li>Contact you via phone call or WhatsApp to confirm your moving date and logistical requirements.</li>
                      <li>Coordinate loading vehicles, driver dispatch, and destination unloading.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">4. Direct WhatsApp Communication</h4>
                    <p>
                      Our quote calculation process generates a structured WhatsApp enquiry message that opens in your official WhatsApp application. No automated submission takes place without your consent; you retain full control to inspect the formatted message before manually pressing the "Send" button in WhatsApp to chat with our team.
                    </p>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">5. Google Maps & Geolocation API</h4>
                    <p>
                      Our website utilizes Google Maps JavaScript API and Google Places Autocomplete to help you easily locate your pickup and delivery points. Use of Google Maps features is subject to Google's standard Privacy Policy and Terms of Service. Location access is requested strictly through your browser's native permission prompt and is never tracked without your explicit action.
                    </p>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">6. Data Security & Storage</h4>
                    <p>
                      We enforce standard administrative and technical safeguards to ensure that customer enquiry records remain secure against unauthorized access, loss, or misuse.
                    </p>
                  </div>

                  <div>
                    <h4 className="fw-bold text-dark mb-2">7. Contact the Owner</h4>
                    <p>If you have any questions or concerns regarding our privacy practices, you can reach out directly to the owner:</p>
                    <div className="p-3 rounded-3 bg-light border text-dark">
                      <div><strong>Owner:</strong> {COMPANY_INFO.owner}</div>
                      <div><strong>Company:</strong> {COMPANY_INFO.name}</div>
                      <div><strong>Mobile:</strong> {COMPANY_INFO.mobileFormatted}</div>
                      <div><strong>Email:</strong> {COMPANY_INFO.email}</div>
                      <div><strong>Address:</strong> {COMPANY_INFO.address}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-top text-center">
                  <Link to="/get-quote" className="btn btn-royal-primary px-4 py-2">
                    Back to Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
