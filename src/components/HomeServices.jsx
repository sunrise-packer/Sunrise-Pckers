import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const TOP_6_SERVICES = [
  {
    title: "Household Shifting",
    slug: "home-shifting",
    image: "/images/sofa-cushion-packing.jpg",
    badge: "Residential",
    desc: "Complete home & apartment packing"
  },
  {
    title: "Office Relocation",
    slug: "office-shifting",
    image: "/images/heavy-furniture-hallway.jpg",
    badge: "Corporate",
    desc: "IT servers, workstations & desks"
  },
  {
    title: "Car Transportation",
    slug: "car-transportation",
    image: "/images/container-truck-loaded.jpg",
    badge: "Enclosed Carrier",
    desc: "Zero-scratch vehicle transit"
  },
  {
    title: "Bike Transportation",
    slug: "bike-transportation",
    image: "/images/bike-scooter-packing.jpg",
    badge: "Two-Wheeler",
    desc: "Multi-layer bubble wrap protection"
  },
  {
    title: "Packing & Moving",
    slug: "packing-moving",
    image: "/images/movenxt-cartons-film.jpg",
    badge: "5-Ply Cartons",
    desc: "Premium quality packing supplies"
  },
  {
    title: "Warehousing & Storage",
    slug: "storage-warehousing",
    image: "/images/drum-boxes-packing.jpg",
    badge: "Safe Vaults",
    desc: "Clean & secure storage facilities"
  }
];

export default function HomeServices() {
  return (
    <section className="home-services-section py-5 bg-white">
      <div className="container">
        {/* Section Header with Decorative Lines (Exact from Reference) */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <span className="title-divider-line" />
            <h2 className="section-title-reference mb-0 fw-extrabold">Our Services</h2>
            <span className="title-divider-line" />
          </div>
          <p className="text-muted small">
            Safe, reliable packing and relocation services across all cities and states in India
          </p>
        </div>

        {/* 6 Cards in a Single Row on Large Screens (Exact from Reference with Actual Photos) */}
        <div className="row g-3 g-lg-3 row-cols-2 row-cols-sm-3 row-cols-lg-6 mb-4">
          {TOP_6_SERVICES.map((srv, idx) => (
            <div key={idx} className="col">
              <Link
                to={`/services/${srv.slug}`}
                className="reference-service-card d-flex flex-column p-0 rounded-4 bg-white border h-100 text-decoration-none shadow-sm overflow-hidden"
              >
                {/* Real Image Container */}
                <div className="service-card-photo-wrap position-relative overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="service-card-real-img w-100"
                    loading="lazy"
                  />
                  <span className="service-mini-tag position-absolute top-0 end-0 m-2 badge bg-primary text-white fs-8 px-2 py-1">
                    {srv.badge}
                  </span>
                </div>

                {/* Card Title & Info */}
                <div className="p-3 text-center d-flex flex-column flex-grow-1 justify-content-between">
                  <h6 className="service-card-name fw-bold text-dark mb-1">
                    {srv.title}
                  </h6>
                  <span className="text-primary fs-8 fw-semibold mt-1 d-inline-flex align-items-center justify-content-center gap-1">
                    <span>View Details</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Explore All Services CTA */}
        <div className="text-center">
          <Link to="/services" className="btn btn-royal-outline px-4 py-2 small fw-bold">
            <span>Explore All 12 Moving Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
