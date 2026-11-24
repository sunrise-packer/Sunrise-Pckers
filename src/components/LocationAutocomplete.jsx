import React, { useEffect, useRef, useState, useCallback } from 'react';
import { searchLocationSuggestions, reverseGeocode } from '../services/locationService';
import { loadGoogleMaps } from '../utils/googleMapsLoader';

export default function LocationAutocomplete({
  label,
  placeholder,
  value = '',
  onChange,
  onLocationSelect,
  required = false,
  id,
  error,
  disabled = false
}) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const [isLocating, setIsLocating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [geoNotice, setGeoNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-load Google Maps asynchronously in background once on mount
  useEffect(() => {
    loadGoogleMaps().catch(() => {
      // Ignored: locationService will gracefully fallback
    });
  }, []);

  // Debounced search query
  const triggerSearch = useCallback((searchTerm) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchTerm || searchTerm.trim().length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchLocationSuggestions(searchTerm);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setActiveIndex(-1);
      } catch (err) {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    }, 220);
  }, []);

  // Handle typing: always editable, never blocked
  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (onLocationSelect) {
      onLocationSelect({ address: val, coords: null });
    }

    triggerSearch(val);
  };

  // Dedicated Clear Button: clears field and refocuses input
  const handleClear = () => {
    onChange('');
    if (onLocationSelect) {
      onLocationSelect({ address: '', coords: null });
    }
    setSuggestions([]);
    setShowDropdown(false);
    setGeoNotice(null);
    setActiveIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Select suggestion
  const handleSelectSuggestion = (item) => {
    const selectedAddress = item.fullAddress || item.mainText;
    onChange(selectedAddress);
    setShowDropdown(false);
    setSuggestions([]);
    setActiveIndex(-1);

    if (onLocationSelect) {
      onLocationSelect({
        address: selectedAddress,
        coords: item.coords || null,
        placeDetails: item
      });
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keyboard Navigation: ArrowDown, ArrowUp, Enter, Escape
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === 'ArrowDown' && value.trim().length >= 1) {
        triggerSearch(value);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Browser Geolocation: Fills current location using reverse geocoding
  const handleCurrentLocationClick = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation is not supported by your browser. Please type your location manually.');
      return;
    }

    setIsLocating(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const { address, coords } = await reverseGeocode(lat, lng);
          onChange(address);
          if (onLocationSelect) {
            onLocationSelect({ address, coords });
          }
        } catch (err) {
          const fallback = `Current Location (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;
          onChange(fallback);
          if (onLocationSelect) {
            onLocationSelect({ address: fallback, coords: { lat, lng } });
          }
        } finally {
          setIsLocating(false);
          if (inputRef.current) inputRef.current.focus();
        }
      },
      (geoError) => {
        setIsLocating(false);
        let msg = 'GPS blocked or timed out. Please type your address manually below.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please type your address manually.';
        }
        setGeoNotice(msg);
      },
      { timeout: 9000, enableHighAccuracy: true, maximumAge: 30000 }
    );
  };

  return (
    <div
      ref={containerRef}
      className="location-field-wrapper mb-3 position-relative"
      style={{ zIndex: showDropdown ? 1060 : 'auto' }}
    >
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label htmlFor={id} className="form-label fw-semibold text-dark mb-0 fs-7">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        </div>
      )}

      <div className="input-group location-input-group">
        <span className="input-group-text bg-white border-end-0 text-muted">
          <i className="bi bi-geo-alt-fill text-primary" />
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={`form-control border-start-0 ps-1 ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.trim().length >= 1 && suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          required={required}
          disabled={disabled}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <span className="input-group-text bg-white border-start-0 border-end-0 px-2">
            <span
              className="spinner-border spinner-border-sm text-primary"
              style={{ width: '0.9rem', height: '0.9rem' }}
              role="status"
              aria-hidden="true"
            />
          </span>
        )}

        {/* 1-Click Clear Button */}
        {value && value.length > 0 && !disabled && (
          <button
            type="button"
            className="btn btn-outline-light text-muted border-top border-bottom border-start-0 border-end-0 px-2 d-flex align-items-center"
            onClick={handleClear}
            title="Clear and retype address"
            aria-label="Clear location input"
          >
            <i className="bi bi-x-circle-fill text-secondary fs-7" />
          </button>
        )}

        {/* Current Location GPS Button */}
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center gap-1 px-3"
          onClick={handleCurrentLocationClick}
          title="Detect and use current GPS location"
          disabled={isLocating || disabled}
          aria-label="Detect current location"
        >
          {isLocating ? (
            <span
              className="spinner-border spinner-border-sm text-primary"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <i className="bi bi-crosshair text-primary fs-7" />
          )}
          <span className="d-none d-sm-inline small fw-semibold">Current</span>
        </button>
      </div>

      {/* Validation Feedback */}
      {error && <div className="invalid-feedback d-block mt-1 small">{error}</div>}

      {/* Geolocation Notice */}
      {geoNotice && (
        <div className="alert alert-warning py-1 px-2 small mt-1 d-flex justify-content-between align-items-center fs-8">
          <span>{geoNotice}</span>
          <button
            type="button"
            className="btn-close-custom p-0 border-0 bg-transparent text-muted"
            onClick={() => setGeoNotice(null)}
            aria-label="Close notice"
          >
            <i className="bi bi-x-lg fs-8" />
          </button>
        </div>
      )}

      {/* Real-time Location Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          className="smart-location-dropdown shadow-xl rounded-3 border bg-white"
          role="listbox"
          id={`${id}-suggestions`}
        >
          <div className="dropdown-header-strip px-3 py-1 bg-light border-bottom text-muted fs-8 fw-semibold d-flex justify-content-between align-items-center">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-search text-primary fs-8" /> Suggested Locations in India
            </span>
            <button
              type="button"
              className="border-0 bg-transparent text-muted p-0"
              onClick={() => setShowDropdown(false)}
              aria-label="Close suggestions"
            >
              <i className="bi bi-x-lg fs-8" />
            </button>
          </div>
          <ul className="list-unstyled mb-0 py-1" style={{ maxHeight: '260px', overflowY: 'auto' }}>
            {suggestions.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <li key={item.id || idx}>
                  <button
                    type="button"
                    className={`dropdown-item py-2 px-3 d-flex align-items-start gap-2 text-start border-0 bg-transparent w-100 ${
                      isSelected ? 'active bg-primary-subtle text-primary' : ''
                    }`}
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <i className="bi bi-geo-alt-fill text-primary mt-1 flex-shrink-0 fs-7" />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-semibold text-dark fs-7 text-truncate">
                        {item.mainText}
                      </div>
                      {item.secondaryText && (
                        <div className="text-muted fs-8 text-truncate">
                          {item.secondaryText}
                        </div>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
