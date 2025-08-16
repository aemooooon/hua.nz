import { createContext, useContext } from 'react';

// PhotoSwipe Context
export const PhotoSwipeContext = createContext();

// Hook to use PhotoSwipe
export const usePhotoSwipe = () => {
  const context = useContext(PhotoSwipeContext);
  if (!context) {
    throw new Error('usePhotoSwipe must be used within a PhotoSwipeProvider');
  }
  return context;
};
