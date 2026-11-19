import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, MessageCircle, Mail, MapPin, Send,
  ShieldCheck, Clock, User, CheckCircle2, AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { COMPANY_INFO } from '../data/company';
import { loadGoogleMaps } from '../utils/googleMapsLoader';

export default function Contact() {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  // Load interactive Google Map centered on office location in New Mumbai
  useEffect(() => {
    let isMounted = true;
    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !mapContainerRef.current) return;
        try {
          const officePos = { lat: COMPANY_INFO.coordinates.lat, lng: COMPANY_INFO.coordinates.lng };
          const map = new googleMaps.Map(mapContainerRef.current, {
            center: officePos,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false
          });

          const marker = new googleMaps.Marker({
            position: officePos,
            map: map,
            title: COMPANY_INFO.name,
            animation: googleMaps.Animation.DROP
          });

          const infoWindow = new googleMaps.InfoWindow({
            content: `
              <div style="padding: 6px; font-family: sans-serif;">
                <strong style="color: #38245C;">${COMPANY_INFO.name}</strong><br/>
                <span style="font-size: 12px; color: #555;">${COMPANY_INFO.address}</span><br/>
                <span style="font-size: 12px; color: #333;"><strong>Owner:</strong> ${COMPANY_INFO.owner}</span><br/>
                <a href="tel:${COMPANY_INFO.mobile}" style="font-size: 12px; color: #0284C7;">Call: ${COMPANY_INFO.mobileFormatted}</a>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Open info window by default
          infoWindow.open(map, marker);
          setMapLoaded(true);
        } catch (err) {
          console.warn('Map initialization note:', err);
        }
      })
      .catch((err) => {
        console.warn('Google maps script note:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const waMsg = `*GENERAL CONTACT INQUIRY — SUNRISE PACKERS & MOVERS*
---------------------------------------
👤 *Name:* ${formData.name.trim()}
📞 *Phone:* ${formData.phone.trim()}
${formData.email.trim() ? `✉️ *Email:* ${formData.email.trim()}\n` : ''}
📌 *Subject:* ${formData.subject.trim() || 'General Inquiry'}
💬 *Message:* ${formData.message.trim() || 'Please contact me regarding shifting services.'}
---------------------------------------`;

    const encoded = encodeURIComponent(waMsg);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setFormSent(true);
  };

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us | Sunrise Packers & Movers"
        description="Contact Sunrise Packers & Movers and owner Praveen Kumar Saket. Phone: 8517952427, WhatsApp: +91 8517952427, Address: Near Mansarovar Station, New Mumbai."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Contact Us</span>
          </nav>
          <h1>Contact Sunrise Packers & Movers</h1>
          <p>
            We are here to assist you with every aspect of your move across India. Call, WhatsApp, or visit our office.
          </p>
        </div>
      </div>

      {/* Contact Cards & Form Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          {/* Top 3 Info Cards */}
          <div className="row g-4 mb-5">
            {/* Phone Card */}
            <div className="col-md-4">
              <div className="royal-card p-4 text-center h-100 bg-white">
                <div className="p-3 rounded-circle bg-primary-soft text-primary d-inline-flex mb-3">
                  <Phone size={26} />
                </div>
                <h5 className="fw-bold mb-2">Direct Phone Call</h5>
                <p className="text-muted small mb-3">
                  Speak directly with owner Praveen Kumar Saket for instant assistance.
                </p>
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-call-solid w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <Phone size={16} />
                  <span>Call {COMPANY_INFO.mobileFormatted}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="col-md-4">
              <div className="royal-card p-4 text-center h-100 bg-white">
                <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success d-inline-flex mb-3">
                  <MessageCircle size={26} />
                </div>
                <h5 className="fw-bold mb-2">WhatsApp Instant Chat</h5>
                <p className="text-muted small mb-3">
                  Fastest response for estimates, packing photos, and moving dates.
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="col-md-4">
              <div className="royal-card p-4 text-center h-100 bg-white">
                <div className="p-3 rounded-circle bg-primary-soft text-primary d-inline-flex mb-3">
                  <MapPin size={26} />
                </div>
                <h5 className="fw-bold mb-2">Office Address</h5>
                <p className="text-muted small mb-2 text-start">
                  {COMPANY_INFO.address}
                </p>
                <div className="badge bg-light text-primary border small">
                  Near Mansarovar Station
                </div>
              </div>
            </div>
          </div>

          {/* Form & Map Row */}
          <div className="row g-4 g-lg-5 align-items-stretch">
            {/* Quick Contact Form */}
            <div className="col-lg-6">
              <div className="royal-card p-4 p-md-5 bg-white h-100">
                <div className="mb-4">
                  <span className="section-badge">Send a Message</span>
                  <h3 className="fw-bold mb-2">Get in Touch with Our Team</h3>
                  <p className="text-muted small mb-0">
                    Submit your query and we will connect back via call or WhatsApp.
                  </p>
                </div>

                {formSent && (
                  <div className="alert alert-success d-flex align-items-center gap-2 small py-2 mb-3">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>WhatsApp conversation initiated! We will reply promptly.</span>
                  </div>
                )}

                <form onSubmit={handleQuickContactSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold text-dark">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold text-dark">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Optional email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Domestic Shifting to Delhi, Bike Transport"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-dark">Message</label>
                    <textarea
                      rows={4}
                      className="form-control"
                      placeholder="Tell us about your moving requirements, origin, destination, or query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-royal-primary w-100 py-3">
                    <Send size={18} />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Interactive Google Map & Business Info */}
            <div className="col-lg-6">
              <div className="royal-card p-4 p-md-5 bg-white h-100 d-flex flex-column">
                <div className="mb-3">
                  <span className="section-badge">Head Office Map</span>
                  <h3 className="fw-bold mb-2">Locate Us in New Mumbai</h3>
                  <p className="text-muted small mb-0">
                    Juhi Gaon Hanuman Mandir Kamautha Top Number 2, Near Mansarovar Station, New Mumbai 410206.
                  </p>
                </div>

                {/* Google Map Container */}
                <div
                  ref={mapContainerRef}
                  className="rounded-4 overflow-hidden border flex-grow-1 mb-3"
                  style={{ minHeight: '320px', backgroundColor: '#e5e7eb' }}
                >
                  {!mapLoaded && (
                    <div className="d-flex align-items-center justify-content-center h-100 text-muted p-4 text-center">
                      <div>
                        <MapPin size={32} className="text-primary mb-2" />
                        <div><strong>Sunrise Packers & Movers Office</strong></div>
                        <div className="small">Near Mansarovar Station, New Mumbai, Maharashtra 410206</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Info Strip */}
                <div className="p-3 rounded-3 bg-light border small text-muted">
                  <div className="d-flex justify-content-between mb-1">
                    <span><strong>Owner:</strong> {COMPANY_INFO.owner}</span>
                    <span><strong>Coverage:</strong> All India</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span><strong>Email:</strong> {COMPANY_INFO.email}</span>
                    <span><strong>Support:</strong> 24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
