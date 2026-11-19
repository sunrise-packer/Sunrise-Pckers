import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react';

const REAL_FEEDBACK = [
  {
    quote: "Sunrise Packers & Movers provided disciplined packing and safe transportation for our household shifting. Everything arrived intact without a single scratch.",
    name: "Verified Household Client",
    location: "Navi Mumbai to Pune Move"
  },
  {
    quote: "Very punctual and polite crew. Praveen ji personally supervised the bike packaging and vehicle loading. Highly recommended for domestic moves.",
    name: "Inter-State Vehicle Client",
    location: "Maharashtra to Gujarat Move"
  },
  {
    quote: "Smooth office relocation. Dismantled workstations and reassembled them properly at our new commercial premises with zero loss of working time.",
    name: "Corporate Client",
    location: "Commercial Shifting"
  }
];

export default function HomeTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? REAL_FEEDBACK.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev === REAL_FEEDBACK.length - 1 ? 0 : prev + 1));
  };

  const current = REAL_FEEDBACK[activeIndex];

  return (
    <section id="testimonials-section" className="testimonials-section py-4 bg-white border-bottom">
      <div className="container">
        <div className="royal-card p-4 bg-light-surface border shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
              <Quote size={22} className="text-warning fill-warning" />
              <span>What Our Customers Say</span>
            </h4>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-circle p-1"
                onClick={prev}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-circle p-1"
                onClick={next}
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="row align-items-center g-3">
            <div className="col-md-9">
              <p className="fs-6 fst-italic text-dark mb-2">
                "{current.quote}"
              </p>
              <div className="small text-muted">
                <strong className="text-primary">— {current.name}</strong> ({current.location})
              </div>
            </div>
            <div className="col-md-3 text-md-end">
              <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill small">
                Direct Client Feedback
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
