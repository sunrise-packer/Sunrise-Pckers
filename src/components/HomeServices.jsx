import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TOP_6_SERVICES = [
  {
    title: "Household Shifting",
    slug: "home-shifting",
    image: "/images/home-service.jpg",
    desc: "Safe household and residential shifting"
  },
  {
    title: "Office Relocation",
    slug: "office-shifting",
    image: "/images/office-service.jpg",
    desc: "Corporate IT equipment & office desk moving"
  },
  {
    title: "Car Transportation",
    slug: "car-transportation",
    image: "/images/car-service.jpg",
    desc: "Zero-scratch enclosed car carrier transit"
  },
  {
    title: "Bike Transportation",
    slug: "bike-transportation",
    image: "/images/bike-service.jpg",
    desc: "Safe door-to-door two-wheeler transport"
  },
  {
    title: "Packing & Moving",
    slug: "packing-moving",
    image: "/images/packing-service.jpg",
    desc: "Multi-layer bubble wrap & 5-ply cartons"
  },
  {
    title: "Warehousing & Storage",
    slug: "storage-warehousing",
    image: "/images/warehouse-service.jpg",
    desc: "Secure, moisture-free storage facility"
  }
];

export default function HomeServices() {
  return (
    <section className="home-services-section py-5 bg-white">
      <div className="container">
        {/* Section Header with Decorative Wings (Exact from Reference) */}
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

        {/* 6 Cards in a Single Row on Large Screens (Exact Reference Layout) */}
        <div className="row g-3 g-lg-3 row-cols-2 row-cols-sm-3 row-cols-lg-6 mb-4">
          {TOP_6_SERVICES.map((srv, idx) => (
            <div key={idx} className="col">
              <Link
                to={`/services/${srv.slug}`}
                className="reference-service-card d-flex flex-column rounded-3 bg-white border h-100 text-decoration-none shadow-sm overflow-hidden"
              >
                {/* Clean Product Visual Container on White */}
                <div className="service-card-photo-wrap">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="service-card-real-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Title (Centered, Bold, Reference Typography) */}
                <div className="service-card-info p-2 px-1 text-center d-flex flex-column flex-grow-1 justify-content-center">
                  <h6 className="service-card-name fw-bold text-dark mb-0">
                    {srv.title}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Explore All Services CTA */}
        <div className="text-center">
          <Link to="/services" className="btn btn-royal-outline px-4 py-2 small fw-bold">
            <span>Explore All Moving Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
