import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANY_INFO } from '../data/company';
import LocationAutocomplete from './LocationAutocomplete';

const SERVICE_OPTIONS = [
  { id: 'Household Shifting', label: 'Household Shifting', icon: 'bi-house-door-fill' },
  { id: 'Office Relocation', label: 'Office Relocation', icon: 'bi-building' },
  { id: 'Car Transportation', label: 'Car Transportation', icon: 'bi-car-front-fill' },
  { id: 'Bike Transportation', label: 'Bike Transportation', icon: 'bi-bicycle' },
  { id: 'Packing & Moving', label: 'Packing & Moving', icon: 'bi-box-seam-fill' },
  { id: 'Warehousing & Storage', label: 'Warehousing & Storage', icon: 'bi-building-lock' }
];

const REPEAT_INTERVAL_MS = 15000; // Exactly 15 seconds everywhere per requirement

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    movingFrom: '',
    movingTo: '',
    selectedService: 'Household Shifting',
    movingDate: ''
  });
  const [errors, setErrors] = useState({});

  const timerRef = useRef(null);
  const retryTimerRef = useRef(null);

  // Check if user is actively typing in any input/textarea on the page
  const isUserTyping = useCallback(() => {
    const active = document.activeElement;
    if (!active) return false;
    const tag = active.tagName ? active.tagName.toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || tag === 'select' || active.isContentEditable;
  }, []);

  // Schedule the popup after the specified delay
  const schedulePopup = useCallback((delayMs = REPEAT_INTERVAL_MS) => {
    // Clear any existing timers to prevent duplicates
    if (timerRef.current) clearTimeout(timerRef.current);
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);

    // If already submitted in this session, do not schedule
    if (typeof window !== 'undefined' && sessionStorage.getItem('sunrise_enquiry_submitted') === 'true') {
      return;
    }

    timerRef.current = setTimeout(() => {
      // If user has submitted in the meantime, abort
      if (sessionStorage.getItem('sunrise_enquiry_submitted') === 'true') {
        return;
      }

      // Check if user is currently typing in an input or filling the homepage form
      if (isUserTyping()) {
        // Defer for 3 seconds so we never interrupt typing
        retryTimerRef.current = setTimeout(() => {
          if (!isUserTyping() && sessionStorage.getItem('sunrise_enquiry_submitted') !== 'true') {
            setIsOpen(true);
          } else {
            schedulePopup(5000);
          }
        }, 3000);
        return;
      }

      setIsOpen(true);
    }, delayMs);
  }, [isUserTyping]);

  // Initial automatic display when website opens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadySubmitted = sessionStorage.getItem('sunrise_enquiry_submitted') === 'true';
      if (!alreadySubmitted) {
        // Open the first popup automatically shortly after website opens (1 second entrance)
        schedulePopup(1000);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [schedulePopup]);

  // Handle user closing the popup: wait EXACTLY 15 seconds and show it again
  const handleClose = () => {
    setIsOpen(false);
    // Restart the 15-second timer
    schedulePopup(REPEAT_INTERVAL_MS);
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your real full name';
    }

    const cleanMobile = formData.mobileNumber.replace(/[\s\-\+]/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(cleanMobile.slice(-10))) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.movingFrom.trim()) {
      errs.movingFrom = 'Moving From / Pickup location is required';
    }

    if (!formData.movingTo.trim()) {
      errs.movingTo = 'Moving To / Destination location is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate formatted WhatsApp message (Strictly no automatic price estimation)
    const waText = `*NEW MOVING ENQUIRY — SUNRISE PACKERS & MOVERS*
---------------------------------------
👤 *Customer Name:* ${formData.fullName.trim()}
📞 *Mobile Number:* ${formData.mobileNumber.trim()}
🚚 *Selected Service:* ${formData.selectedService}
📍 *Moving From:* ${formData.movingFrom.trim()}
🏁 *Moving To:* ${formData.movingTo.trim()}
📅 *Moving Date:* ${formData.movingDate || 'Flexible / To be confirmed'}
---------------------------------------
_Share your moving details. Our team will contact you to understand your requirements and provide a quotation._`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;

    // Open WhatsApp in a new tab (customer presses Send manually)
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Mark as submitted in session storage: stops popup for remainder of this session
    sessionStorage.setItem('sunrise_enquiry_submitted', 'true');

    // Clean up timers and close popup
    if (timerRef.current) clearTimeout(timerRef.current);
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <div className="enquiry-modal-dialog">
        <div className="enquiry-modal-content position-relative rounded-4 bg-white shadow-xl overflow-visible border">
          {/* Header Banner with Royal Purple theme */}
          <div className="enquiry-modal-header p-3 px-4 bg-royal-primary text-white d-flex align-items-center justify-content-between position-relative">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white p-1 rounded-2 shadow-xs d-none d-sm-block">
                <img
                  src="/images/logo.jpg"
                  alt="Sunrise Packers & Movers"
                  style={{ height: '36px', width: 'auto' }}
                />
              </div>
              <div>
                <h4 id="popup-title" className="fw-bold mb-0 text-white fs-5">
                  Planning Your Next Move?
                </h4>
                <div className="fs-8 text-silver">
                  Service All India • Direct Owner Discussion
                </div>
              </div>
            </div>

            {/* Clear Close (X) Button */}
            <button
              type="button"
              className="btn btn-close-modal text-white p-1 rounded-circle d-flex align-items-center justify-content-center"
              onClick={handleClose}
              aria-label="Close popup"
            >
              <i className="bi bi-x-lg fs-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="enquiry-modal-body p-3 p-sm-4">
            <p className="text-muted small mb-3">
              Share your moving details and Sunrise Packers & Movers will contact you with a suitable quotation.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* 1. Full Name & Mobile Number */}
              <div className="row g-2 mb-2">
                <div className="col-sm-6">
                  <label className="form-label fs-7 fw-semibold text-dark mb-1">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm ${errors.fullName ? 'is-invalid' : ''}`}
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && <div className="invalid-feedback small">{errors.fullName}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="form-label fs-7 fw-semibold text-dark mb-1">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                      placeholder="10-digit number"
                      value={formData.mobileNumber}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, mobileNumber: clean });
                      }}
                    />
                  </div>
                  {errors.mobileNumber && <div className="invalid-feedback d-block small">{errors.mobileNumber}</div>}
                </div>
              </div>

              {/* 2. Moving From & Moving To (Always Editable + GPS + Google Places) */}
              <div className="row g-2 mb-2">
                <div className="col-sm-6">
                  <LocationAutocomplete
                    id="popupPickupLoc"
                    label="Moving From"
                    placeholder="Pickup Area / City"
                    value={formData.movingFrom}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, movingFrom: val }));
                      if (errors.movingFrom) setErrors((prev) => ({ ...prev, movingFrom: null }));
                    }}
                    required
                    error={errors.movingFrom}
                  />
                </div>
                <div className="col-sm-6">
                  <LocationAutocomplete
                    id="popupDestLoc"
                    label="Moving To"
                    placeholder="Destination Area / City"
                    value={formData.movingTo}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, movingTo: val }));
                      if (errors.movingTo) setErrors((prev) => ({ ...prev, movingTo: null }));
                    }}
                    required
                    error={errors.movingTo}
                  />
                </div>
              </div>

              {/* 3. Service Select & Moving Date */}
              <div className="row g-2 mb-3">
                <div className="col-sm-7">
                  <label className="form-label fs-7 fw-semibold text-dark mb-1">
                    Select Service <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.selectedService}
                    onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-5">
                  <label className="form-label fs-7 fw-semibold text-dark mb-1">
                    Moving Date <span className="text-muted fw-normal fs-8">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={formData.movingDate}
                    onChange={(e) => setFormData({ ...formData, movingDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="small text-muted mb-3 fs-8 bg-light p-2 rounded border">
                <i className="bi bi-shield-check text-primary me-1" />
                Submit your moving details. Owner <strong>{COMPANY_INFO.owner}</strong> will contact you to understand your requirements and provide a quotation.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-whatsapp-solid w-100 py-2 fs-6 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
              >
                <i className="bi bi-whatsapp fs-5" />
                <span>Submit Enquiry on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
