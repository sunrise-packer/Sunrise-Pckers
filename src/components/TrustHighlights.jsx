import React from 'react';
import { ShieldCheck, Truck, Users, Globe } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure Packing",
    description: "Multi-layer bubble wrap, edge guards, and heavy-duty corrugated cartons to keep every item protected against shock and vibration."
  },
  {
    icon: Truck,
    title: "Reliable Transportation",
    description: "Dedicated closed container trucks and specialized carrier fleet to ensure weatherproof and timely point-to-point transit."
  },
  {
    icon: Users,
    title: "Professional Moving Support",
    description: "Trained and disciplined ground personnel who handle heavy furniture, appliances, and delicate items with care and respect."
  },
  {
    icon: Globe,
    title: "All India Service",
    description: "Comprehensive relocation coverage across Mumbai, Navi Mumbai, and every major state and city throughout India."
  }
];

export default function TrustHighlights() {
  return (
    <section className="trust-highlights-section py-4">
      <div className="container">
        <div className="row g-3 g-lg-4">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="trust-highlight-card h-100 p-4 rounded-4 bg-white border">
                  <div className="highlight-icon-wrapper mb-3">
                    <Icon size={28} />
                  </div>
                  <h5 className="highlight-title fw-bold mb-2">{item.title}</h5>
                  <p className="highlight-desc text-muted small mb-0">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
