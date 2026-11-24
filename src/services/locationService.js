/**
 * Centralized Location Search & Reverse Geocoding Service
 * Sunrise Packers & Movers
 *
 * Multi-Engine Architecture:
 * 1. Google Places AutocompleteService (Primary when API key is active on domain)
 * 2. Real-Time High-Accuracy India Location Search (Photon/OSM - addresses, societies, buildings, villages, PIN codes)
 * 3. Local High-Priority Curated Indian Nodes & Corridors (Instant zero-latency fallback)
 */

import { isGoogleMapsLoaded } from '../utils/googleMapsLoader';
import { searchLocations as searchLocalDb, POPULAR_LOCATIONS } from '../data/indianLocations';

// Cache for autocomplete predictions to minimize network calls
const searchCache = new Map();

/**
 * Real-time Indian location suggestion search
 * @param {string} rawQuery - The search term typed by the user
 * @returns {Promise<Array>} List of standardized location suggestions
 */
export async function searchLocationSuggestions(rawQuery) {
  const query = (rawQuery || '').trim();

  // If query is empty, return top local popular locations
  if (query.length === 0) {
    return POPULAR_LOCATIONS.slice(0, 6).map((loc, idx) => ({
      id: `pop-${idx}`,
      mainText: loc.name,
      secondaryText: `${loc.state}${loc.pin ? ` • PIN: ${loc.pin}` : ''}`,
      fullAddress: `${loc.name}, ${loc.state}${loc.pin ? ` - ${loc.pin}` : ''}`,
      source: 'popular'
    }));
  }

  const cacheKey = query.toLowerCase();
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const results = [];
  const seenAddresses = new Set();

  const addResult = (item) => {
    const key = item.fullAddress.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seenAddresses.has(key)) {
      seenAddresses.add(key);
      results.push(item);
    }
  };

  // 1. Try Google Places AutocompleteService if Google Maps is loaded on domain
  if (isGoogleMapsLoaded() && window.google?.maps?.places?.AutocompleteService) {
    try {
      const googleResults = await new Promise((resolve) => {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'in' }
          },
          (predictions, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              Array.isArray(predictions)
            ) {
              const mapped = predictions.map((p) => ({
                id: p.place_id,
                mainText: p.structured_formatting?.main_text || p.description,
                secondaryText: p.structured_formatting?.secondary_text || '',
                fullAddress: p.description,
                placeId: p.place_id,
                source: 'google'
              }));
              resolve(mapped);
            } else {
              resolve([]);
            }
          }
        );
      });

      googleResults.forEach(addResult);
    } catch (err) {
      console.warn('[Sunrise Location] Google Places query notice:', err);
    }
  }

  // 2. Real-Time High-Accuracy India Location Search (Nominatim / Photon engine)
  // Supports societies, buildings, apartments, villages, pin codes, and landmarks
  if (results.length < 5 && query.length >= 2) {
    try {
      const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8&lang=en`;
      const response = await fetch(photonUrl, {
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.features)) {
          for (const feature of data.features) {
            const props = feature.properties || {};

            // Restrict strictly to India
            const isIndia =
              props.countrycode === 'IN' ||
              (props.country && props.country.toLowerCase() === 'india');

            if (!isIndia) continue;

            const name = props.name || '';
            const street = props.street || '';
            const locality = props.locality || props.district || props.suburb || '';
            const city = props.city || props.county || '';
            const state = props.state || '';
            const postcode = props.postcode || '';

            // Construct readable main text and secondary details
            const mainParts = [name || street].filter(Boolean);
            const secondaryParts = [
              name && street && name !== street ? street : null,
              locality,
              city,
              state,
              postcode ? `PIN: ${postcode}` : null
            ].filter(Boolean);

            const fullParts = [
              name,
              street && street !== name ? street : null,
              locality,
              city,
              state,
              postcode ? `- ${postcode}` : null
            ].filter(Boolean);

            const mainText = mainParts.join(', ') || query;
            const secondaryText = secondaryParts.join(', ');
            const fullAddress = fullParts.join(', ');

            if (fullAddress.length > 0) {
              addResult({
                id: `osm-${props.osm_id || Math.random()}`,
                mainText,
                secondaryText,
                fullAddress,
                coords: feature.geometry?.coordinates
                  ? {
                      lat: feature.geometry.coordinates[1],
                      lng: feature.geometry.coordinates[0]
                    }
                  : null,
                source: 'places'
              });
            }
          }
        }
      }
    } catch (err) {
      // Graceful fallback if network is constrained
    }
  }

  // 3. Local High-Priority Curated Indian Nodes & Corridors Fallback
  const localMatches = searchLocalDb(query);
  for (const loc of localMatches) {
    addResult({
      id: `local-${loc.name}-${loc.pin || ''}`,
      mainText: loc.name,
      secondaryText: `${loc.state}${loc.pin ? ` • PIN: ${loc.pin}` : ''}`,
      fullAddress: `${loc.name}, ${loc.state}${loc.pin ? ` - ${loc.pin}` : ''}`,
      source: 'database'
    });
  }

  const finalResults = results.slice(0, 8);
  searchCache.set(cacheKey, finalResults);

  // Keep cache size bounded
  if (searchCache.size > 150) {
    const oldestKey = searchCache.keys().next().value;
    searchCache.delete(oldestKey);
  }

  return finalResults;
}

/**
 * Reverse Geocodes coordinates to a human-readable Indian address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<{ address: string, coords: { lat: number, lng: number } }>}
 */
export async function reverseGeocode(lat, lng) {
  const userCoords = { lat, lng };

  // Step 1: Try Google Geocoder if loaded and healthy
  if (isGoogleMapsLoaded() && window.google?.maps?.Geocoder) {
    try {
      const googleAddress = await new Promise((resolve) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: userCoords }, (results, status) => {
          if (status === 'OK' && results?.[0]?.formatted_address) {
            resolve(results[0].formatted_address);
          } else {
            resolve(null);
          }
        });
      });

      if (googleAddress) {
        return { address: googleAddress, coords: userCoords };
      }
    } catch (err) {
      console.warn('[Sunrise Location] Google Reverse Geocode notice:', err);
    }
  }

  // Step 2: OpenStreetMap Nominatim Reverse Geocode (High accuracy across India)
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const response = await fetch(nominatimUrl, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.address) {
        const a = data.address;
        const landmark = a.amenity || a.building || a.shop || a.residential || '';
        const road = a.road || a.pedestrian || '';
        const locality = a.suburb || a.neighbourhood || a.subdistrict || '';
        const city = a.city || a.town || a.village || a.county || '';
        const state = a.state || '';
        const pin = a.postcode || '';

        const parts = [landmark, road, locality, city, state, pin ? `- ${pin}` : '']
          .filter(Boolean)
          .join(', ');

        const formatted = parts || data.display_name;
        if (formatted) {
          return { address: formatted, coords: userCoords };
        }
      }
    }
  } catch (err) {
    // Continue to fallback
  }

  // Step 3: Geographic heuristic fallback if offline
  const isNearNaviMumbai = lat > 18.8 && lat < 19.3 && lng > 72.8 && lng < 73.2;
  const fallbackText = isNearNaviMumbai
    ? `Near Kamothe / Mansarovar, Navi Mumbai (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`
    : `Detected Location (GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)})`;

  return { address: fallbackText, coords: userCoords };
}
