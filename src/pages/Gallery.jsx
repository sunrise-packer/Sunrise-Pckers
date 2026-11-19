import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ZoomIn, Filter, Film, Image as ImageIcon, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import MediaLightbox from '../components/MediaLightbox';
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from '../data/gallery';

export default function Gallery() {
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'photo' | 'video'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  const handlePrev = () => {
    if (activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeItemIndex < filteredItems.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  return (
    <div className="gallery-page">
      <SEO
        title="Photo & Video Gallery | Sunrise Packers & Movers"
        description="Authentic packaging, loading, and transportation photos and ground videos by Sunrise Packers & Movers. Real proof of work across India."
      />

      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Gallery</span>
          </nav>
          <h1>Work Gallery — Photos & Ground Videos</h1>
          <p>
            Real on-site documentation of our packing standards, closed container vehicle fleet, and vehicle transport operations across India.
          </p>
        </div>
      </div>

      {/* Main Gallery Section */}
      <section className="section-padding bg-light-surface">
        <div className="container">
          {/* Controls Bar: Type Tabs + Category Filters */}
          <div className="gallery-controls-card p-3 p-md-4 rounded-4 bg-white border mb-4 shadow-sm">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              {/* Type Tabs: All / Photos / Videos */}
              <div className="media-type-pills d-flex p-1 bg-light rounded-pill border">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 ${typeFilter === 'all' ? 'btn-royal-primary text-white' : 'btn-light'}`}
                  onClick={() => setTypeFilter('all')}
                >
                  All ({GALLERY_ITEMS.length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1 ${typeFilter === 'photo' ? 'btn-royal-primary text-white' : 'btn-light'}`}
                  onClick={() => setTypeFilter('photo')}
                >
                  <ImageIcon size={14} />
                  Photos ({GALLERY_ITEMS.filter((i) => i.type === 'photo').length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1 ${typeFilter === 'video' ? 'btn-royal-primary text-white' : 'btn-light'}`}
                  onClick={() => setTypeFilter('video')}
                >
                  <Film size={14} />
                  Videos ({GALLERY_ITEMS.filter((i) => i.type === 'video').length})
                </button>
              </div>

              {/* Category Badges */}
              <div className="category-filter-chips d-flex flex-wrap justify-content-center gap-2">
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`btn btn-sm category-chip ${categoryFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count indicator */}
          <div className="d-flex justify-content-between align-items-center mb-4 small text-muted">
            <span>
              Showing <strong>{filteredItems.length}</strong> items in current filter
            </span>
            <span>Click any item to view in full resolution or play video</span>
          </div>

          {/* Media Grid */}
          <div className="row g-3 g-md-4">
            {filteredItems.map((item, idx) => (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                <div
                  className="gallery-grid-card position-relative rounded-4 overflow-hidden border bg-white shadow-sm h-100"
                  onClick={() => setActiveItemIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveItemIndex(idx);
                    }
                  }}
                >
                  <div className="gallery-media-thumb position-relative overflow-hidden">
                    {item.type === 'video' ? (
                      <div className="position-relative">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-100 object-fit-cover media-element"
                          style={{ height: '260px' }}
                        />
                        <div className="video-badge-overlay">
                          <Play size={24} className="fill-white text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-100 object-fit-cover media-element"
                        style={{ height: '260px' }}
                        loading="lazy"
                      />
                    )}

                    <div className="gallery-hover-overlay">
                      <div className="hover-action-btn">
                        {item.type === 'video' ? <Play size={22} /> : <ZoomIn size={22} />}
                      </div>
                    </div>
                  </div>

                  <div className="gallery-info p-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="badge bg-light text-primary border small text-uppercase">
                        {item.tag || item.category}
                      </span>
                      <span className="text-muted fs-7 text-uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1 fs-6">{item.title}</h6>
                    <p className="text-muted small mb-0 text-truncate-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-5">No media files found for this filter combination.</p>
                <button
                  type="button"
                  className="btn btn-royal-outline btn-sm"
                  onClick={() => {
                    setTypeFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* CTA at Bottom of Gallery */}
          <div className="mt-5 p-4 rounded-4 bg-white border text-center">
            <h4 className="fw-bold mb-2">Impressed by Our Packing & Handling Quality?</h4>
            <p className="text-muted mb-3">
              Request a free quotation for your move today and experience safe relocation.
            </p>
            <Link to="/get-quote" className="btn btn-royal-primary px-4 py-2">
              <span>Get Free Moving Quote</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      {activeItem && (
        <MediaLightbox
          item={activeItem}
          onClose={() => setActiveItemIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={activeItemIndex > 0}
          hasNext={activeItemIndex < filteredItems.length - 1}
        />
      )}
    </div>
  );
}
