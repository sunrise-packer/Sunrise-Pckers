let googleMapsPromise = null;

export const loadGoogleMaps = () => {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'));

  if (window.google && window.google.maps && window.google.maps.places) {
    return Promise.resolve(window.google.maps);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCvhCB1xFRNnObWAimnqKm0H8f8qQO4l7U';

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script tag already exists
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google.maps));
      existingScript.addEventListener('error', (err) => reject(err));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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
      console.warn('Google Maps script failed to load or was blocked by referrer/network policy:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};
