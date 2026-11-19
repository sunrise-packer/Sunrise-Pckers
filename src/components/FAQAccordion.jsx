import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQAccordion({ items, defaultOpenIndex = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-accordion-wrapper">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const qText = item.question || item.q;
        const aText = item.answer || item.a;

        return (
          <div key={idx} className={`faq-card-item mb-3 rounded-3 border bg-white ${isOpen ? 'active' : ''}`}>
            <button
              type="button"
              className="faq-question-btn w-100 p-3 p-md-4 text-start border-0 bg-transparent d-flex justify-content-between align-items-center gap-3"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text fw-bold text-dark d-flex align-items-center gap-2">
                <HelpCircle size={18} className="text-primary flex-shrink-0" />
                <span>{qText}</span>
              </span>
              <span className={`faq-chevron-icon transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-muted" />
              </span>
            </button>

            {isOpen && (
              <div className="faq-answer-body px-3 px-md-4 pb-4 pt-1 text-muted border-top border-light">
                <p className="mb-0">{aText}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
