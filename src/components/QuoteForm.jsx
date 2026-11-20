import React, { useState } from 'react';
import {
  Home, Briefcase, Store, Car, Bike, PackageCheck,
  MapPin, Globe, Warehouse, Truck, Sparkles, Boxes,
  Send, CheckCircle2, AlertCircle, Phone, Calendar,
  Building, Layers, ArrowRight, MessageSquare
} from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';
import { COMPANY_INFO } from '../data/company';

const AVAILABLE_SERVICES = [
  { id: 'Home Shifting', label: 'Home Shifting', icon: Home },
  { id: 'Office Shifting', label: 'Office Shifting', icon: Briefcase },
  { id: 'Shop Shifting', label: 'Shop Shifting', icon: Store },
  { id: 'Car Transportation', label: 'Car Transportation', icon: Car },
  { id: 'Bike Transportation', label: 'Bike Transportation', icon: Bike },
  { id: 'Packing & Moving', label: 'Packing & Moving', icon: PackageCheck },
  { id: 'Local Shifting', label: 'Local Shifting', icon: MapPin },
  { id: 'Domestic Shifting', label: 'Domestic Shifting', icon: Globe },
  { id: 'Storage & Warehousing', label: 'Storage & Warehousing', icon: Warehouse },
  { id: 'Loading & Unloading', label: 'Loading & Unloading', icon: Truck },
  { id: 'Unpacking Service', label: 'Unpacking Service', icon: Sparkles },
  { id: 'Commercial Goods Transportation', label: 'Commercial Goods', icon: Boxes }
];

const PROPERTY_SIZES = [
  '1 RK',
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK+',
  'Independent House'
];

const LIFT_OPTIONS = [
  { id: 'both', label: 'Lift Available at Both Locations' },
  { id: 'pickup-only', label: 'Lift at Pickup Only' },
  { id: 'dest-only', label: 'Lift at Destination Only' },
  { id: 'none', label: 'No Lift (Stairs Only)' }
];

export default function QuoteForm({ defaultService = null }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    selectedServices: defaultService ? [defaultService] : ['Home Shifting'],
    pickupLocation: '',
    destinationLocation: '',
    movingDate: '',
    propertySize: '2 BHK',
    approximateItems: '',
    pickupFloor: 'Ground Floor',
    destinationFloor: 'Ground Floor',
    liftAvailability: 'both',
    additionalMessage: ''
  });

  const [pickupCoords, setPickupCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [errors, setErrors] = useState({});
  const [isReadyForWhatsApp, setIsReadyForWhatsApp] = useState(false);

  // Toggle service selection
  const handleToggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      let updated;
      if (exists) {
        // Keep at least one service
        if (prev.selectedServices.length === 1) return prev;
        updated = prev.selectedServices.filter((s) => s !== serviceId);
      } else {
        updated = [...prev.selectedServices, serviceId];
      }
      return { ...prev, selectedServices: updated };
    });
    if (errors.selectedServices) {
      setErrors((prev) => ({ ...prev, selectedServices: null }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter a valid full name (at least 3 characters)';
    }

    // Indian mobile number validation (10 digits, starts with 6, 7, 8, or 9)
    const cleanMobile = formData.mobileNumber.replace(/[\s\-\+]/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(cleanMobile.slice(-10))) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formData.emailAddress && !/^\S+@\S+\.\S+$/.test(formData.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address';
    }

    if (formData.selectedServices.length === 0) {
      errs.selectedServices = 'Please select at least one moving service';
    }

    if (!formData.pickupLocation.trim()) {
      errs.pickupLocation = 'Pickup location is required';
    }

    if (!formData.destinationLocation.trim()) {
      errs.destinationLocation = 'Destination location is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.is-invalid');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsReadyForWhatsApp(true);
  };

  const constructWhatsAppMessage = () => {
    const liftText = LIFT_OPTIONS.find((l) => l.id === formData.liftAvailability)?.label || formData.liftAvailability;

    return `*NEW MOVING ENQUIRY — SUNRISE PACKERS & MOVERS*
---------------------------------------
👤 *Customer Name:* ${formData.fullName.trim()}
📞 *Mobile Number:* ${formData.mobileNumber.trim()}
${formData.emailAddress.trim() ? `✉️ *Email:* ${formData.emailAddress.trim()}\n` : ''}
🚚 *Selected Services:* ${formData.selectedServices.join(', ')}
📍 *Pickup Location:* ${formData.pickupLocation.trim()}
🏁 *Destination Location:* ${formData.destinationLocation.trim()}
📅 *Expected Moving Date:* ${formData.movingDate || 'Flexible / To be discussed'}
🏠 *Property Size:* ${formData.propertySize}
📦 *Approx Items:* ${formData.approximateItems.trim() || 'Standard Household Goods'}
🏢 *Floor Details:*
   • Pickup: ${formData.pickupFloor}
   • Destination: ${formData.destinationFloor}
🛗 *Lift Status:* ${liftText}
${formData.additionalMessage.trim() ? `📝 *Special Notes:* ${formData.additionalMessage.trim()}\n` : ''}
---------------------------------------
_Share your moving details. Our team will contact you to understand your requirements and provide a quotation._`;
  };

  const handleOpenWhatsApp = () => {
    const text = constructWhatsAppMessage();
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="quote-form-container">
      {/* Review Modal / Confirmation Before WhatsApp */}
      {isReadyForWhatsApp && (
        <div className="modal-backdrop-custom" onClick={() => setIsReadyForWhatsApp(false)}>
          <div className="modal-dialog-custom modal-dialog-review" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom bg-royal-primary text-white p-3">
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={24} className="text-warning" />
                <h5 className="mb-0 fw-bold text-white">Review Your Moving Enquiry</h5>
              </div>
              <button
                type="button"
                className="btn-close-custom text-white"
                onClick={() => setIsReadyForWhatsApp(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-custom p-4">
              <div className="alert alert-light border d-flex gap-2 align-items-start mb-3">
                <AlertCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                <div className="small">
                  <strong>Ready to send via WhatsApp:</strong> Your details will be formatted into an instant WhatsApp enquiry to Praveen Kumar Saket (Sunrise Packers & Movers). You can review the summary below and click <strong>Open WhatsApp to Send</strong>.
                </div>
              </div>

              <div className="review-summary-table bg-white p-3 rounded-3 border">
                <div className="row g-2 small">
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Full Name</span>
                    <strong className="text-dark">{formData.fullName}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Mobile Number</span>
                    <strong className="text-dark">{formData.mobileNumber}</strong>
                  </div>
                  <div className="col-12">
                    <span className="text-muted d-block">Selected Services</span>
                    <strong className="text-primary">{formData.selectedServices.join(', ')}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Pickup Location</span>
                    <strong className="text-dark">{formData.pickupLocation}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Destination Location</span>
                    <strong className="text-dark">{formData.destinationLocation}</strong>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Moving Date</span>
                    <strong>{formData.movingDate || 'Flexible'}</strong>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Property Size</span>
                    <strong>{formData.propertySize}</strong>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Lift Status</span>
                    <strong>{formData.liftAvailability}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer-custom p-3 border-top d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsReadyForWhatsApp(false)}
              >
                Edit Details
              </button>
              <button
                type="button"
                className="btn btn-whatsapp-solid px-4 py-2"
                onClick={handleOpenWhatsApp}
              >
                <Send size={18} />
                Open WhatsApp to Send
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* SECTION 1: SERVICES SELECTION */}
        <div className="form-section-card mb-4 p-4 rounded-4 bg-white border">
          <div className="section-step-indicator mb-3 d-flex align-items-center gap-2">
            <span className="step-badge">1</span>
            <div>
              <h5 className="mb-0 fw-bold">Select Required Services</h5>
              <small className="text-muted">Click on one or more services to include in your quotation</small>
            </div>
          </div>

          {errors.selectedServices && (
            <div className="alert alert-danger py-2 small mb-3">{errors.selectedServices}</div>
          )}

          <div className="row g-2 g-md-3">
            {AVAILABLE_SERVICES.map((srv) => {
              const IconComp = srv.icon;
              const isSelected = formData.selectedServices.includes(srv.id);

              return (
                <div key={srv.id} className="col-6 col-md-4 col-lg-3">
                  <div
                    role="button"
                    tabIndex={0}
                    className={`service-select-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleService(srv.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleToggleService(srv.id);
                      }
                    }}
                  >
                    <div className="pill-icon-wrap">
                      <IconComp size={20} />
                    </div>
                    <span className="pill-title">{srv.label}</span>
                    <div className="check-indicator">
                      {isSelected ? <CheckCircle2 size={16} /> : <div className="circle-placeholder" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: LOCATIONS */}
        <div className="form-section-card mb-4 p-4 rounded-4 bg-white border">
          <div className="section-step-indicator mb-3 d-flex align-items-center gap-2">
            <span className="step-badge">2</span>
            <div>
              <h5 className="mb-0 fw-bold">Pickup & Destination Details</h5>
              <small className="text-muted">Type for Google autocomplete suggestions or click Current GPS icon</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <LocationAutocomplete
                id="pickupLocation"
                label="Pickup Address / City"
                placeholder="Enter pickup society, street, or city (e.g. Mansarovar, Navi Mumbai)"
                value={formData.pickupLocation}
                onChange={(val) => {
                  setFormData((prev) => ({ ...prev, pickupLocation: val }));
                  if (errors.pickupLocation) setErrors((prev) => ({ ...prev, pickupLocation: null }));
                }}
                onLocationSelect={(data) => setPickupCoords(data.coords)}
                required
                error={errors.pickupLocation}
              />
            </div>

            <div className="col-md-6">
              <LocationAutocomplete
                id="destinationLocation"
                label="Destination Address / City"
                placeholder="Enter destination area, city or state (All India Coverage)"
                value={formData.destinationLocation}
                onChange={(val) => {
                  setFormData((prev) => ({ ...prev, destinationLocation: val }));
                  if (errors.destinationLocation) setErrors((prev) => ({ ...prev, destinationLocation: null }));
                }}
                onLocationSelect={(data) => setDestCoords(data.coords)}
                required
                error={errors.destinationLocation}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: MOVE INVENTORY & PROPERTY SPECS */}
        <div className="form-section-card mb-4 p-4 rounded-4 bg-white border">
          <div className="section-step-indicator mb-3 d-flex align-items-center gap-2">
            <span className="step-badge">3</span>
            <div>
              <h5 className="mb-0 fw-bold">Move Size, Date & Property Specifications</h5>
              <small className="text-muted">Helps us plan the right vehicle size and packing supplies</small>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-dark mb-2">
                Property / Move Size <span className="text-muted small fw-normal">(Select best match)</span>
              </label>
              <div className="property-size-chips d-flex flex-wrap gap-2">
                {PROPERTY_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`btn size-chip ${formData.propertySize === size ? 'active' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, propertySize: size }))}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="movingDate" className="form-label fw-semibold text-dark">
                Preferred Moving Date
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white text-muted">
                  <Calendar size={18} />
                </span>
                <input
                  id="movingDate"
                  type="date"
                  className="form-control"
                  value={formData.movingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, movingDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="approximateItems" className="form-label fw-semibold text-dark">
                Major Goods / Approximate Items
              </label>
              <input
                id="approximateItems"
                type="text"
                className="form-control"
                placeholder="e.g. Fridge, Washing Machine, 2 Beds, Sofa, 15 Boxes"
                value={formData.approximateItems}
                onChange={(e) => setFormData((prev) => ({ ...prev, approximateItems: e.target.value }))}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="pickupFloor" className="form-label fw-semibold text-dark">
                Pickup Floor
              </label>
              <select
                id="pickupFloor"
                className="form-select"
                value={formData.pickupFloor}
                onChange={(e) => setFormData((prev) => ({ ...prev, pickupFloor: e.target.value }))}
              >
                <option value="Ground Floor">Ground Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="5th - 10th Floor">5th - 10th Floor</option>
                <option value="11th Floor or Above">11th Floor or Above</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="destinationFloor" className="form-label fw-semibold text-dark">
                Destination Floor
              </label>
              <select
                id="destinationFloor"
                className="form-select"
                value={formData.destinationFloor}
                onChange={(e) => setFormData((prev) => ({ ...prev, destinationFloor: e.target.value }))}
              >
                <option value="Ground Floor">Ground Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="5th - 10th Floor">5th - 10th Floor</option>
                <option value="11th Floor or Above">11th Floor or Above</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="liftAvailability" className="form-label fw-semibold text-dark">
                Lift Availability
              </label>
              <select
                id="liftAvailability"
                className="form-select"
                value={formData.liftAvailability}
                onChange={(e) => setFormData((prev) => ({ ...prev, liftAvailability: e.target.value }))}
              >
                {LIFT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: CONTACT INFORMATION */}
        <div className="form-section-card mb-4 p-4 rounded-4 bg-white border">
          <div className="section-step-indicator mb-3 d-flex align-items-center gap-2">
            <span className="step-badge">4</span>
            <div>
              <h5 className="mb-0 fw-bold">Your Contact Details</h5>
              <small className="text-muted">We will respond immediately with an accurate quotation</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label fw-semibold text-dark">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
                }}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="mobileNumber" className="form-label fw-semibold text-dark">
                Mobile Number (WhatsApp Preferred) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white text-muted">+91</span>
                <input
                  id="mobileNumber"
                  type="tel"
                  maxLength={10}
                  className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setFormData((prev) => ({ ...prev, mobileNumber: clean }));
                    if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: null }));
                  }}
                />
              </div>
              {errors.mobileNumber && <div className="invalid-feedback d-block">{errors.mobileNumber}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="emailAddress" className="form-label fw-semibold text-dark">
                Email Address <span className="text-muted fw-normal">(Optional)</span>
              </label>
              <input
                id="emailAddress"
                type="email"
                className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                placeholder="name@example.com"
                value={formData.emailAddress}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, emailAddress: e.target.value }));
                  if (errors.emailAddress) setErrors((prev) => ({ ...prev, emailAddress: null }));
                }}
              />
              {errors.emailAddress && <div className="invalid-feedback">{errors.emailAddress}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="additionalMessage" className="form-label fw-semibold text-dark">
                Additional Instructions or Remarks
              </label>
              <input
                id="additionalMessage"
                type="text"
                className="form-control"
                placeholder="e.g. Need packing on Saturday morning, fragile piano/plants"
                value={formData.additionalMessage}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalMessage: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON BAR */}
        <div className="p-4 rounded-4 bg-royal-primary text-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 shadow-lg">
          <div>
            <h5 className="text-white mb-1 fw-bold">Ready to Discuss Your Moving Requirements?</h5>
            <p className="text-silver mb-0 small">
              Share your moving details. Our team will contact you to understand your requirements and provide a quotation.
            </p>
          </div>
          <button type="submit" className="btn btn-whatsapp-solid px-4 py-3 fs-6 flex-shrink-0 d-inline-flex align-items-center gap-2">
            <i className="bi bi-whatsapp fs-5" />
            <span>Submit Enquiry on WhatsApp</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
