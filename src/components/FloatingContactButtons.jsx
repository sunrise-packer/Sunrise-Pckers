import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';

export default function FloatingContactButtons() {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const quickMessage = encodeURIComponent(
    `Hello Sunrise Packers & Movers! I need a quote for shifting. Please contact me.`
  );

  return (
    <div className="floating-contact-wrapper" aria-label="Quick contact buttons">
      {/* Call Floating Button */}
      <div className="floating-btn-item mb-2">
        {hoveredBtn === 'call' && (
          <span className="floating-tooltip call-tooltip shadow-sm">
            Call: {COMPANY_INFO.mobile}
          </span>
        )}
        <a
          href={`tel:${COMPANY_INFO.mobile}`}
          className="floating-btn floating-call-btn shadow-lg"
          aria-label={`Call Sunrise Packers & Movers at ${COMPANY_INFO.mobile}`}
          onMouseEnter={() => setHoveredBtn('call')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <i className="bi bi-telephone-fill floating-icon" />
          <span className="floating-pulse-ring call-ring" />
        </a>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="floating-btn-item">
        {hoveredBtn === 'whatsapp' && (
          <span className="floating-tooltip wa-tooltip shadow-sm">
            Chat on WhatsApp
          </span>
        )}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${quickMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-wa-btn shadow-lg"
          aria-label="Chat with Sunrise Packers & Movers on WhatsApp"
          onMouseEnter={() => setHoveredBtn('whatsapp')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <i className="bi bi-whatsapp floating-icon" />
          <span className="floating-pulse-ring wa-ring" />
        </a>
      </div>
    </div>
  );
}
