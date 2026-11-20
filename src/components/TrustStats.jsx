import React from 'react';
import { BUSINESS_STATS } from '../data/company';

export default function TrustStats() {
  const { customerRating, allIndiaService, happyCustomers, successfulMoves } = BUSINESS_STATS;

  // Star rendering for 4.5 rating (4 full stars, 1 half star, 0 empty)
  const renderStars = (score = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalf = score % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="bi bi-star-fill text-warning fs-6" aria-hidden="true" />
      );
    }
    if (hasHalf) {
      stars.push(
        <i key="half" className="bi bi-star-half text-warning fs-6" aria-hidden="true" />
      );
    }
    const emptyCount = 5 - Math.ceil(score);
    for (let i = 0; i < emptyCount; i++) {
      stars.push(
        <i key={`empty-${i}`} className="bi bi-star text-warning fs-6" aria-hidden="true" />
      );
    }
    return stars;
  };

  return (
    <section className="trust-stats-section py-4 bg-light border-top border-bottom" aria-label="Company Trust and Statistics">
      <div className="container">
        <div className="row g-3 align-items-center justify-content-center">
          {/* Customer Rating Card (4.5 / 5) */}
          {customerRating.enabled && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="trust-stat-card d-flex align-items-center gap-3 p-3 bg-white rounded-3 border shadow-xs h-100">
                <div className="trust-stat-icon-wrap bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-star-fill fs-4" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-extrabold text-dark fs-5">{customerRating.score} / {customerRating.maxScore}</span>
                    <div className="d-inline-flex gap-1">
                      {renderStars(customerRating.score)}
                    </div>
                  </div>
                  <div className="text-muted small fw-semibold">
                    {customerRating.label}
                    {customerRating.reviewCount ? ` (${customerRating.reviewCount})` : ''}
                  </div>
                  {customerRating.sourceUrl && (
                    <a
                      href={customerRating.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary fs-8 text-decoration-none d-inline-block mt-1 fw-bold"
                    >
                      View Verified Reviews <i className="bi bi-box-arrow-up-right" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All India Service Card */}
          {allIndiaService.enabled && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="trust-stat-card d-flex align-items-center gap-3 p-3 bg-white rounded-3 border shadow-xs h-100">
                <div className="trust-stat-icon-wrap bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-globe-asia-australia fs-4" />
                </div>
                <div>
                  <div className="fw-extrabold text-dark fs-5 mb-1">{allIndiaService.title}</div>
                  <div className="text-muted small fw-semibold">{allIndiaService.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* Happy Customers (Configurable - displayed only if verified figures exist) */}
          {happyCustomers.enabled && happyCustomers.count && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="trust-stat-card d-flex align-items-center gap-3 p-3 bg-white rounded-3 border shadow-xs h-100">
                <div className="trust-stat-icon-wrap bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-people-fill fs-4" />
                </div>
                <div>
                  <div className="fw-extrabold text-dark fs-5 mb-1">{happyCustomers.count}</div>
                  <div className="text-muted small fw-semibold">{happyCustomers.label}</div>
                </div>
              </div>
            </div>
          )}

          {/* Successful Moves (Configurable - displayed only if verified figures exist) */}
          {successfulMoves.enabled && successfulMoves.count && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="trust-stat-card d-flex align-items-center gap-3 p-3 bg-white rounded-3 border shadow-xs h-100">
                <div className="trust-stat-icon-wrap bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-truck fs-4" />
                </div>
                <div>
                  <div className="fw-extrabold text-dark fs-5 mb-1">{successfulMoves.count}</div>
                  <div className="text-muted small fw-semibold">{successfulMoves.label}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
