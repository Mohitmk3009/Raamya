'use client';

import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks if a CSS media query matches.
 * @param {string} query - The CSS media query string to watch.
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query) => {
  // Initialize state, defaulting to false for server-side rendering.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // This code only runs on the client.
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Update state immediately with the initial match status.
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      // Create a listener to update state when the viewport changes.
      const listener = () => {
        setMatches(media.matches);
      };

      media.addEventListener('change', listener);

      // Cleanup function to remove the listener when the component unmounts.
      return () => media.removeEventListener('change', listener);
    }
  }, [matches, query]);

  return matches;
};