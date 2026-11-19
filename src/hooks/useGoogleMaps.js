import { useState, useEffect } from 'react';
import { loadGoogleMaps } from '../utils/googleMapsLoader';

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps()
      .then(() => {
        if (isMounted) {
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Google Maps load notice:', err);
          setLoadError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoaded, loadError };
};
