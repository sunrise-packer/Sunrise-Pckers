import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Check, X, Navigation, AlertCircle } from 'lucide-react';
import { loadGoogleMaps } from '../utils/googleMapsLoader';

export default function MapPickerModal({ isOpen, onClose, onConfirm, initialLocation, title = "Select Location on Map" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  const [coords, setCoords] = useState(
    initialLocation?.coords || { lat: 19.0163, lng: 73.0978 } // Default: Navi Mumbai / Mansarovar
  );
  const [address, setAddress] = useState(initialLocation?.address || '');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize Map when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isSubscribed = true;

    loadGoogleMaps()
      .then((googleMaps) => {
        if (!isSubscribed || !mapContainerRef.current) return;

        try {
          const startingPos = coords.lat && coords.lng ? coords : { lat: 19.0163, lng: 73.0978 };

          geocoderRef.current = new googleMaps.Geocoder();

          const map = new googleMaps.Map(mapContainerRef.current, {
            center: startingPos,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          });

          mapInstanceRef.current = map;

          const marker = new googleMaps.Marker({
            position: startingPos,
            map: map,
            draggable: true,
            title: "Drag to set location",
            animation: googleMaps.Animation.DROP
          });

          markerRef.current = marker;

          // Drag event
          marker.addListener('dragend', (e) => {
            const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setCoords(newPos);
            reverseGeocode(newPos, googleMaps);
          });

          // Click on map event
          map.addListener('click', (e) => {
            const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            marker.setPosition(newPos);
            setCoords(newPos);
            reverseGeocode(newPos, googleMaps);
          });

          // If no address initially, reverse geocode starting position
          if (!address && startingPos.lat) {
            reverseGeocode(startingPos, googleMaps);
          }
        } catch (err) {
          console.error('Error initializing map:', err);
          setMapError('Failed to initialize Google Maps. You can still confirm or enter the address manually.');
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setMapError('Google Maps API could not be reached. Please check network connection or enter address directly.');
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [isOpen]);

  const reverseGeocode = (pos, googleMapsInstance) => {
    setIsGeocoding(true);
    const geocoder = geocoderRef.current || (googleMapsInstance && new googleMapsInstance.Geocoder());

    if (geocoder) {
      geocoder.geocode({ location: pos }, (results, status) => {
        setIsGeocoding(false);
        if (status === 'OK' && results && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          // Fallback reverse geocoding via Nominatim if Google geocoder hits quota or referer
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.display_name) {
                setAddress(data.display_name);
              }
            })
            .catch(() => {});
        }
      });
    } else {
      setIsGeocoding(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(userPos);

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setCenter(userPos);
          mapInstanceRef.current.setZoom(16);
          markerRef.current.setPosition(userPos);
        }

        if (window.google && window.google.maps) {
          reverseGeocode(userPos, window.google.maps);
        }
      },
      (err) => {
        setIsLocating(false);
        alert("Location access denied or unavailable. Please pick a location on the map manually.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleConfirm = () => {
    onConfirm({
      address: address || `Selected Point (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`,
      coords
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <div className="d-flex align-items-center gap-2">
            <MapPin className="text-primary-custom" size={22} />
            <h5 className="mb-0 fw-bold">{title}</h5>
          </div>
          <button type="button" className="btn-close-custom" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-custom">
          {mapError && (
            <div className="alert alert-warning d-flex align-items-center gap-2 py-2 px-3 mb-2 fs-7">
              <AlertCircle size={16} />
              <span>{mapError}</span>
            </div>
          )}

          <div className="map-toolbar d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">
              Click anywhere on the map or drag the pin to set your exact location.
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
            >
              <Navigation size={14} className={isLocating ? 'spin-icon' : ''} />
              {isLocating ? 'Locating...' : 'My Location'}
            </button>
          </div>

          <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '360px', borderRadius: '12px', backgroundColor: '#e5e7eb' }}
          />

          <div className="selected-location-box mt-3 p-3 bg-light rounded-3 border">
            <div className="d-flex align-items-start gap-2">
              <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
              <div className="flex-grow-1">
                <div className="fw-semibold small text-uppercase text-muted">Selected Address</div>
                <div className="fw-bold text-dark mt-1">
                  {isGeocoding ? (
                    <span className="text-muted fst-italic">Fetching address details...</span>
                  ) : address ? (
                    address
                  ) : (
                    <span className="text-muted">No address detected yet. Drag or click the marker.</span>
                  )}
                </div>
                <div className="text-muted small mt-1">
                  Latitude: {coords.lat?.toFixed(5)}, Longitude: {coords.lng?.toFixed(5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer-custom d-flex justify-content-end gap-2 p-3 border-top">
          <button type="button" className="btn btn-light px-3" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-royal-primary px-4 d-flex align-items-center gap-2"
            onClick={handleConfirm}
          >
            <Check size={18} />
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}
