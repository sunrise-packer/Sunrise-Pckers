import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Map as MapIcon, Loader2 } from 'lucide-react';
import { loadGoogleMaps } from '../utils/googleMapsLoader';
import MapPickerModal from './MapPickerModal';

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
  const autocompleteRef = useRef(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  // Setup Google Places Autocomplete
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
              if (onLocationSelect) {
                onLocationSelect({ address: selectedAddr, coords: locationCoords });
              }
            }
          });
        } catch (err) {
          console.warn('Could not initialize Google Places Autocomplete:', err);
        }
      })
      .catch((err) => {
        // Fallback: regular text input remains fully functional
      });

    return () => {
      isMounted = false;
      if (autocompleteRef.current && window.google && window.google.maps && window.google.maps.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Browser Geolocation
  const handleCurrentLocationClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Please type the address manually.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCoords(userCoords);

        // Reverse Geocode
        loadGoogleMaps()
          .then((googleMaps) => {
            const geocoder = new googleMaps.Geocoder();
            geocoder.geocode({ location: userCoords }, (results, status) => {
              setIsLocating(false);
              if (status === 'OK' && results && results[0]) {
                const formattedAddr = results[0].formatted_address;
                onChange(formattedAddr);
                if (onLocationSelect) {
                  onLocationSelect({ address: formattedAddr, coords: userCoords });
                }
              } else {
                fallbackReverseGeocode(userCoords);
              }
            });
          })
          .catch(() => {
            fallbackReverseGeocode(userCoords);
          });
      },
      (geoError) => {
        setIsLocating(false);
        console.warn('Geolocation error:', geoError);
        alert('Could not retrieve current location. Please enter your address or pick on map.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const fallbackReverseGeocode = (pos) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLocating(false);
        if (data && data.display_name) {
          onChange(data.display_name);
          if (onLocationSelect) {
            onLocationSelect({ address: data.display_name, coords: pos });
          }
        }
      })
      .catch(() => {
        setIsLocating(false);
        onChange(`GPS: ${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`);
      });
  };

  const handleMapConfirm = ({ address: confirmedAddr, coords: confirmedCoords }) => {
    setCoords(confirmedCoords);
    onChange(confirmedAddr);
    if (onLocationSelect) {
      onLocationSelect({ address: confirmedAddr, coords: confirmedCoords });
    }
  };

  return (
    <div className="location-field-wrapper mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <label htmlFor={id} className="form-label fw-semibold text-dark mb-0">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <button
          type="button"
          className="btn-select-map-link text-decoration-none border-0 bg-transparent p-0 d-inline-flex align-items-center gap-1 text-primary small fw-semibold"
          onClick={() => setIsMapModalOpen(true)}
        >
          <MapIcon size={14} />
          <span>Select on Map</span>
        </button>
      </div>

      <div className="input-group location-input-group">
        <span className="input-group-text bg-white border-end-0 text-muted">
          <MapPin size={18} className="text-primary-custom" />
        </span>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className={`form-control border-start-0 ps-1 ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
