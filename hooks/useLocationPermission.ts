import { useState, useEffect } from 'react';
import { requestLocationPermission } from '../app/(tabs)/src/LocationService';

export const useLocationPermission = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      try {
        setIsLoading(true);
        const granted = await requestLocationPermission();
        setPermissionGranted(granted);
      } catch (error) {
        console.error('Error in useLocationPermission:', error);
        setPermissionGranted(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRequestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      setIsLoading(true);
      const granted = await requestLocationPermission();
      setPermissionGranted(granted);
      return granted;
    } catch (error) {
      console.error('Error requesting permission:', error);
      setPermissionGranted(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    permissionGranted,
    isLoading,
    requestPermission,
  };
}; 