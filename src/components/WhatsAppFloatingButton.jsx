import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function WhatsAppFloatingButton() {
  const quickMessage = encodeURIComponent(
    `Hello Sunrise Packers & Movers! I would like to get a moving quotation. Please provide details.`
  );

  return (
    <div className="floating-actions-container">
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${quickMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn shadow-lg"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={28} className="wa-icon" />
        <span className="wa-tooltip d-none d-md-inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
