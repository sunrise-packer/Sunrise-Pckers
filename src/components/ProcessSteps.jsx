import React from 'react';
import { Send, PhoneCall, FileText, PackageCheck, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Submit Your Enquiry",
    desc: "Share your pickup and destination locations, moving date, and item details through our website form or WhatsApp.",
    icon: Send
  },
  {
    step: "02",
    title: "Discuss Requirements",
    desc: "Our moving coordinator evaluates your item volume, packing needs, floor levels, and specialized handling instructions.",
    icon: PhoneCall
  },
  {
    step: "03",
    title: "Get Your Moving Quote",
    desc: "Receive an upfront, transparent quotation with all packing, vehicle transport, and labor charges clearly outlined.",
    icon: FileText
  },
  {
    step: "04",
    title: "Packing & Transportation",
    desc: "Our experienced crew arrives with packing supplies, secures your goods, and transports them safely in closed carriers.",
    icon: PackageCheck
  },
  {
    step: "05",
    title: "Safe Delivery",
    desc: "Prompt delivery at your new doorstep with careful unloading, verification against the inventory list, and room placement.",
    icon: CheckCircle2
  }
];

export default function ProcessSteps() {
  return (
    <div className="process-timeline-container">
      <div className="row g-4 justify-content-center">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="col-12 col-md-6 col-lg-2-4 col-xl-2-4">
              <div className="process-step-card text-center p-3 h-100 rounded-4 bg-white border">
                <div className="step-number-pill mb-2">{item.step}</div>
                <div className="step-icon-circle mx-auto mb-3">
                  <Icon size={24} />
                </div>
                <h6 className="step-title fw-bold mb-2">{item.title}</h6>
                <p className="step-desc text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
