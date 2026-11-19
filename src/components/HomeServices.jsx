import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Briefcase, Car, Bike, PackageCheck, Warehouse,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '../data/services';

const TOP_6_SERVICES = [
  {
    title: "Household Shifting",
    slug: "home-shifting",
    icon: Home,
    desc: "Safe home and apartment moving"
  },
  {
    title: "Office Relocation",
    slug: "office-shifting",
    icon: Briefcase,
    desc: "Corporate IT & office transit"
  },
  {
    title: "Car Transportation",
    slug: "car-transportation",
    icon: Car,
    desc: "Enclosed vehicle carrier trailers"
  },
  {
    title: "Bike Transportation",
    slug: "bike-transportation",
    icon: Bike,
    desc: "Multi-layer bubble wrap transit"
  },
  {
    title: "Packing & Moving",
    slug: "packing-moving",
    icon: PackageCheck,
    desc: "5-ply carton & protective packing"
  },
  {
    title: "Warehousing & Storage",
    slug: "storage-warehousing",
    icon: Warehouse,
    desc: "Clean & secure storage vaults"
  }
];

export default function HomeServices() {
  return (
    <section className="home-services-section py-5 bg-white">
      <div className="container">
        {/* Section Header with Decorative Line (Exact from Reference) */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <span className="title-divider-line" />
            <h2 className="section-title-reference mb-0 fw-bold">Our Services</h2>
            <span className="title-divider-line" />
          </div>
          <p className="text-muted small">
            End-to-end relocation and transport solutions across all states of India
          </p>
        </div>

        {/* 6 Cards in a Single Row on Large Screens (Exact from Reference) */}
        <div className="row g-3 g-lg-3 row-cols-2 row-cols-sm-3 row-cols-lg-6 mb-4">
          {TOP_6_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="col">
                <Link
                  to={`/services/${srv.slug}`}
                  className="reference-service-card d-flex flex-column align-items-center text-center p-3 rounded-4 bg-white border h-100 text-decoration-none shadow-sm"
                >
                  <div className="service-icon-box mb-3 d-flex align-items-center justify-content-center rounded-3">
                    <Icon size={34} className="text-primary-custom" />
                  </div>
                  <h6 className="service-card-name fw-bold text-dark mb-0">
                    {srv.title}
                  </h6>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Explore All Services CTA */}
        <div className="text-center">
          <Link to="/services" className="btn btn-royal-outline px-4 py-2 small fw-semibold">
            <span>Explore All 12 Moving Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
