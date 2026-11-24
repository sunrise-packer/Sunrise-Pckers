let googleMapsPromise = null;
let googleMapsAuthFailed = false;

// Register global authentication failure handler to catch API key / referrer errors gracefully
if (typeof window !== 'undefined') {
  window.gm_authFailure = () => {
    googleMapsAuthFailed = true;
    console.warn(
      '[Sunrise Maps] Google Maps API Authentication Notice: The Google Maps API key has domain or quota restrictions on this host. Falling back to built-in high-accuracy real-time location service.'
    );
  };
}

export const isGoogleMapsAuthFailed = () => googleMapsAuthFailed;

export const isGoogleMapsLoaded = () => {
  return (
    typeof window !== 'undefined' &&
    !!(window.google && window.google.maps && window.google.maps.places && !googleMapsAuthFailed)
  );
};

export const loadGoogleMaps = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Window not available (SSR context)'));
  }

  // Already loaded and healthy
  if (window.google && window.google.maps && window.google.maps.places) {
    if (googleMapsAuthFailed) {
      return Promise.reject(new Error('Google Maps authentication failed'));
    }
    return Promise.resolve(window.google.maps);
  }

  // Promise already in flight
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    'AIzaSyCvhCB1xFRNnObWAimnqKm0H8f8qQO4l7U';

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script element already exists
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        existingScript.addEventListener('load', () => {
          if (window.google && window.google.maps) {
            resolve(window.google.maps);
          } else {
            reject(new Error('Google Maps script loaded without window.google.maps'));
          }
        });
        existingScript.addEventListener('error', (err) => reject(err));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error('Google Maps SDK loaded but window.google.maps is undefined'));
      }
    };

    script.onerror = (error) => {
      googleMapsAuthFailed = true;
      console.warn(
        '[Sunrise Maps] Google Maps script failed to load or was blocked by referrer/network policy:',
        error
      );
      reject(error);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};
