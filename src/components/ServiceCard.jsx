import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Briefcase, Store, Car, Bike, PackageCheck,
  MapPin, Globe, Warehouse, Truck, Sparkles, Boxes,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Home,
  Briefcase,
  Store,
  Car,
  Bike,
  PackageCheck,
  MapPin,
  Globe,
  Warehouse,
  Truck,
  Sparkles,
  Boxes
};

export default function ServiceCard({ service }) {
  const IconComponent = ICON_MAP[service.icon] || PackageCheck;

  return (
    <div className="service-card-wrapper h-100">
      <div className="service-card royal-card d-flex flex-column p-0 overflow-hidden">
        {/* Service Image */}
        <div className="service-card-img-wrap position-relative">
          <img
            src={service.image}
            alt={service.title}
            className="service-card-img"
            loading="lazy"
          />
          <div className="service-icon-badge">
            <IconComponent size={22} />
          </div>
        </div>

        {/* Content */}
        <div className="service-card-body p-4 d-flex flex-column flex-grow-1">
          <h4 className="service-card-title fw-bold mb-2 fs-5">
            <Link to={`/services/${service.slug}`} className="text-dark hover-primary text-decoration-none">
              {service.title}
            </Link>
          </h4>
          <p className="service-card-desc text-muted small flex-grow-1 mb-3">
            {service.shortDescription}
          </p>

          <div className="service-card-footer pt-3 border-top d-flex justify-content-between align-items-center">
            <Link
              to={`/services/${service.slug}`}
              className="service-link-btn d-inline-flex align-items-center gap-1 text-primary fw-semibold small"
            >
              <span>Learn More</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to={`/get-quote?service=${encodeURIComponent(service.title)}`}
              className="btn btn-sm btn-outline-primary py-1 px-2 fs-7"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
