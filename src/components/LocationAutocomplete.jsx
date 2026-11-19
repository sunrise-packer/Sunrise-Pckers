import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Map as MapIcon, Loader2, Check, X } from 'lucide-react';
import { loadGoogleMaps } from '../utils/googleMapsLoader';
import MapPickerModal from './MapPickerModal';
import { searchLocations, POPULAR_LOCATIONS } from '../data/indianLocations';

export default function LocationAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  onLocationSelect,
  required = false,
  id,
  error
}) {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [isLocating, setIsLocating] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [geoNotice, setGeoNotice] = useState(null);

  // Setup Google Places Autocomplete if available on domain
  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isMounted || !inputRef.current || !googleMaps.places) return;

        try {
          const autocomplete = new googleMaps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'in' },
            fields: ['formatted_address', 'geometry', 'name']
          });

          autocompleteRef.current = autocomplete;

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              const selectedAddr = place.formatted_address;
              const locationCoords = place.geometry ? {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              } : null;

              setCoords(locationCoords);
              onChange(selectedAddr);
              setShowDropdown(false);
              if (onLocationSelect) {
                onLocationSelect({ address: selectedAddr, coords: locationCoords });
              }
            }
          });
        } catch (err) {
          console.warn('Google Places Autocomplete notice:', err);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Handle typing: trigger instant built-in autocomplete
  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (val.trim().length >= 1) {
      const results = searchLocations(val);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (loc) => {
    const fullAddress = `${loc.name}, ${loc.state} ${loc.pin ? `(${loc.pin})` : ''}`;
    onChange(fullAddress);
    setShowDropdown(false);
    if (onLocationSelect) {
      onLocationSelect({ address: fullAddress, coords: null });
    }
  };

  // Browser Geolocation
  const handleCurrentLocationClick = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation not supported by this browser. Please select or type your area.');
      return;
    }

    setIsLocating(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userCoords = { lat, lng };
        setCoords(userCoords);

        // Check if coordinates are close to Navi Mumbai / Mumbai region
        const isNearMumbai = lat > 18.5 && lat < 19.5 && lng > 72.5 && lng < 73.5;
        const defaultDetectedAddr = isNearMumbai
          ? `Near Mansarovar / Kamothe, Navi Mumbai (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`
          : `Current Location (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;

        // If Google geocoder works, reverse geocode
        if (window.google?.maps?.Geocoder) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userCoords }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const formattedAddr = results[0].formatted_address;
              onChange(formattedAddr);
              if (onLocationSelect) onLocationSelect({ address: formattedAddr, coords: userCoords });
            } else {
              onChange(defaultDetectedAddr);
              if (onLocationSelect) onLocationSelect({ address: defaultDetectedAddr, coords: userCoords });
            }
          });
        } else {
          onChange(defaultDetectedAddr);
          if (onLocationSelect) onLocationSelect({ address: defaultDetectedAddr, coords: userCoords });
        }
      },
      (geoError) => {
        setIsLocating(false);
        // If permission denied or timed out, open quick locality selection
        setGeoNotice('GPS permission blocked or timed out. Please choose from common locations below or type directly:');
        setShowDropdown(true);
        setSuggestions(POPULAR_LOCATIONS.slice(0, 6));
      },
      { timeout: 7000, enableHighAccuracy: false }
    );
  };

  const handleMapConfirm = ({ address: confirmedAddr, coords: confirmedCoords }) => {
    setCoords(confirmedCoords);
    onChange(confirmedAddr);
    setShowDropdown(false);
    if (onLocationSelect) {
      onLocationSelect({ address: confirmedAddr, coords: confirmedCoords });
    }
  };

  return (
    <div className="location-field-wrapper mb-3 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <label htmlFor={id} className="form-label fw-semibold text-dark mb-0 fs-7">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <button
          type="button"
          className="btn-select-map-link text-decoration-none border-0 bg-transparent p-0 d-inline-flex align-items-center gap-1 text-primary fs-8 fw-bold"
          onClick={() => setIsMapModalOpen(true)}
        >
          <MapIcon size={13} />
          <span>Select on Map</span>
        </button>
      </div>

      <div className="input-group location-input-group">
        <span className="input-group-text bg-white border-end-0 text-muted">
          <MapPin size={17} className="text-primary-custom" />
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={`form-control border-start-0 ps-1 ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value && value.trim().length >= 1) {
              const res = searchLocations(value);
              setSuggestions(res);
              setShowDropdown(res.length > 0);
            }
          }}
          required={required}
          autoComplete="off"
        />
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center gap-1 px-3"
          onClick={handleCurrentLocationClick}
          title="Use my current GPS location"
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 size={16} className="spin-icon text-primary" />
          ) : (
            <Navigation size={16} className="text-primary" />
          )}
          <span className="d-none d-sm-inline small">Current</span>
        </button>
      </div>

      {error && <div className="invalid-feedback d-block mt-1 small">{error}</div>}

      {/* Geolocation Notice if GPS blocked */}
      {geoNotice && (
        <div className="alert alert-warning py-1 px-2 small mt-1 d-flex justify-content-between align-items-center fs-8">
          <span>{geoNotice}</span>
          <button
            type="button"
            className="btn-close-custom p-0 border-0 bg-transparent text-muted"
            onClick={() => setGeoNotice(null)}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Instant Intelligent Autocomplete Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div ref={dropdownRef} className="smart-location-dropdown shadow-lg rounded-3 border bg-white">
          <div className="dropdown-header-strip px-3 py-1 bg-light border-bottom text-muted fs-8 fw-semibold d-flex justify-content-between align-items-center">
            <span>Location Suggestions</span>
            <button
              type="button"
              className="border-0 bg-transparent text-muted p-0"
              onClick={() => setShowDropdown(false)}
            >
              <X size={14} />
            </button>
          </div>
          <ul className="list-unstyled mb-0 py-1">
            {suggestions.map((loc, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-start border-0 bg-transparent w-100"
                  onClick={() => handleSelectSuggestion(loc)}
                >
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark fs-7">{loc.name}</div>
                    <div className="text-muted fs-8">{loc.state} {loc.pin && `• Pincode: ${loc.pin}`}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Map Picker Modal */}
      <MapPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onConfirm={handleMapConfirm}
        initialLocation={{ address: value, coords }}
        title={`Pinpoint ${label}`}
      />
    </div>
  );
}
