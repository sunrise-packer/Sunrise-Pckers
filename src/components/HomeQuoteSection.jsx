import React, { useState } from 'react';
import {
  Phone, MessageCircle, Send, CheckCircle2, AlertCircle,
  Home, Briefcase, Store, Car, Bike, PackageCheck,
  MapPin, Globe, Warehouse, Truck, Sparkles, Boxes,
  Calendar, Info
} from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';
import { COMPANY_INFO } from '../data/company';

const SERVICES_OPTIONS = [
  { id: 'Household Shifting', label: 'Household Shifting', icon: Home },
  { id: 'Office Relocation', label: 'Office Relocation', icon: Briefcase },
  { id: 'Car Transportation', label: 'Car Transport', icon: Car },
  { id: 'Bike Transportation', label: 'Bike Transport', icon: Bike },
  { id: 'Packing & Moving', label: 'Packing & Moving', icon: PackageCheck },
  { id: 'Warehousing & Storage', label: 'Warehousing', icon: Warehouse }
];

const PROPERTY_SIZES = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Independent House'];

export default function HomeQuoteSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    selectedServices: ['Household Shifting'],
    pickupLocation: '',
    destinationLocation: '',
    movingDate: '',
    propertySize: '2 BHK',
    approximateItems: '',
    additionalMessage: ''
  });

  const [errors, setErrors] = useState({});

  const handleToggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(serviceId);
      let updated;
      if (exists) {
        if (prev.selectedServices.length === 1) return prev; // keep at least 1
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
    }

    const cleanMobile = formData.mobileNumber.replace(/[\s\-\+]/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(cleanMobile.slice(-10))) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (formData.selectedServices.length === 0) {
      errs.selectedServices = 'Please select at least one service';
    }

    if (!formData.pickupLocation.trim()) {
      errs.pickupLocation = 'Moving From / Pickup location is required';
    }

    if (!formData.destinationLocation.trim()) {
      errs.destinationLocation = 'Moving To / Destination location is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Build formatted WhatsApp message (Strictly no automatic prices, owner discusses directly)
    const waText = `*NEW MOVING ENQUIRY — SUNRISE PACKERS & MOVERS*
---------------------------------------
👤 *Customer Name:* ${formData.fullName.trim()}
📞 *Mobile Number:* ${formData.mobileNumber.trim()}
${formData.emailAddress.trim() ? `✉️ *Email:* ${formData.emailAddress.trim()}\n` : ''}
🚚 *Selected Services:* ${formData.selectedServices.join(', ')}
📍 *Moving From:* ${formData.pickupLocation.trim()}
🏁 *Moving To:* ${formData.destinationLocation.trim()}
📅 *Moving Date:* ${formData.movingDate || 'Flexible / To be confirmed'}
🏠 *Property Size:* ${formData.propertySize}
📦 *Approximate Items:* ${formData.approximateItems.trim() || 'Standard Household Items'}
${formData.additionalMessage.trim() ? `📝 *Message:* ${formData.additionalMessage.trim()}\n` : ''}
---------------------------------------
_Please review and discuss my moving requirements for a quotation._`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="quote-section" className="home-quote-section py-5 bg-light-surface">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-stretch">
          {/* Left Column: Need Help? (Exact from Reference Design) */}
          <div className="col-lg-5">
            <div className="need-help-card p-4 p-md-5 rounded-4 text-white h-100 d-flex flex-column justify-content-between shadow-lg">
              <div>
                <div className="need-help-icon-wrap mb-4">
                  <Phone size={36} className="text-warning" />
                </div>

                <h3 className="display-6 fw-bold text-white mb-2">
                  Need Help?
                </h3>

                <p className="text-silver fs-6 mb-4">
                  Call us now for a hassle-free shifting experience. Owner <strong>{COMPANY_INFO.owner}</strong> is available 24/7 to personally understand your relocation requirements and provide a direct moving quote.
                </p>

                {/* Large Yellow Phone Button (Exact from Reference) */}
                <a
                  href={`tel:${COMPANY_INFO.mobile}`}
                  className="btn btn-need-help-phone w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2 text-decoration-none shadow-md"
                >
                  <Phone size={22} className="fill-current" />
                  <span className="fs-5 fw-bold">+91 {COMPANY_INFO.mobile}</span>
                </a>

                {/* WhatsApp Chat Secondary Action */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-solid w-100 py-3 d-flex align-items-center justify-content-center gap-2 text-decoration-none shadow-sm"
                >
                  <MessageCircle size={20} />
                  <span className="fw-bold">Chat on WhatsApp</span>
                </a>
              </div>

              {/* Service Coverage Tag */}
              <div className="pt-4 border-top border-secondary border-opacity-25 small text-silver mt-4">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <MapPin size={16} className="text-warning flex-shrink-0" />
                  <span><strong>Head Office:</strong> Near Mansarovar Station, New Mumbai</span>
                </div>
                <div><strong>Service Coverage:</strong> All Over India Door-to-Door</div>
              </div>
            </div>
          </div>

          {/* Right Column: Get a Free Quote Form (Exact from Reference Design) */}
          <div className="col-lg-7">
            <div className="quote-form-card royal-card p-4 p-md-4 bg-white h-100 shadow-md">
              <div className="mb-3">
                <h3 className="fw-bold text-dark mb-1">Get a Free Quote</h3>
                <p className="text-muted small mb-2">
                  Fill the form and our team will contact you soon.
                </p>
                {/* STRICT QUOTATION RULE NOTICE */}
                <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-3">
                  <Info size={16} className="text-primary flex-shrink-0" />
                  <span>
                    Submit your moving details and our team will contact you to understand your requirements and provide a quotation.
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Services Selectable Cards */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-dark mb-2">
                    Select Services <span className="text-muted fw-normal">(Click one or more)</span>
                  </label>
                  <div className="row g-2">
                    {SERVICES_OPTIONS.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.selectedServices.includes(srv.id);
                      return (
                        <div key={srv.id} className="col-4 col-sm-4">
                          <button
                            type="button"
                            className={`service-mini-chip w-100 p-2 text-center rounded-3 border ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleToggleService(srv.id)}
                          >
                            <Icon size={18} className="d-block mx-auto mb-1" />
                            <span className="fs-8 fw-semibold text-truncate d-block">{srv.label}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Customer Name & Mobile */}
                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${errors.fullName ? 'is-invalid' : ''}`}
                      placeholder="Enter Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <div className="invalid-feedback small">{errors.fullName}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text bg-white">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                        placeholder="10-digit Mobile"
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

                {/* 3. Moving From & Moving To (With Places Autocomplete + GPS + Map Picker) */}
                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <LocationAutocomplete
                      id="homePickupLoc"
                      label="Moving From"
                      placeholder="Pickup Area / City"
                      value={formData.pickupLocation}
                      onChange={(val) => setFormData((prev) => ({ ...prev, pickupLocation: val }))}
                      required
                      error={errors.pickupLocation}
                    />
                  </div>
                  <div className="col-sm-6">
                    <LocationAutocomplete
                      id="homeDestLoc"
                      label="Moving To"
                      placeholder="Destination Area / City"
                      value={formData.destinationLocation}
                      onChange={(val) => setFormData((prev) => ({ ...prev, destinationLocation: val }))}
                      required
                      error={errors.destinationLocation}
                    />
                  </div>
                </div>

                {/* 4. Moving Date & Property Size */}
                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark mb-1">Moving Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={formData.movingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, movingDate: e.target.value })}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark mb-1">Property Size</label>
                    <select
                      className="form-select form-select-sm"
                      value={formData.propertySize}
                      onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    >
                      {PROPERTY_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Approximate Items / Optional Message */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark mb-1">Approximate Items / Message</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Fridge, 2 Beds, Washing Machine, Sofa, 10 Cartons"
                    value={formData.approximateItems}
                    onChange={(e) => setFormData({ ...formData, approximateItems: e.target.value })}
                  />
                </div>

                {/* Submit on WhatsApp Button (Exact from Reference Design) */}
                <button
                  type="submit"
                  className="btn btn-whatsapp-solid w-100 py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  <MessageCircle size={20} />
                  <span>Submit Enquiry on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
