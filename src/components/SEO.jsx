import { useEffect } from 'react';

export default function SEO({ title, description, path = '' }) {
  useEffect(() => {
    // Update Title
    const baseTitle = "Sunrise Packers & Movers | All India Relocation Services";
    document.title = title ? `${title} | Sunrise Packers & Movers` : baseTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || "Sunrise Packers & Movers - Your Belongings... Our Responsibility. Safe, reliable home shifting, office relocation, vehicle transportation and warehousing across All India. Call: 8517952427.";

    // Scroll to top on page transition
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [title, description, path]);

  return null;
}
