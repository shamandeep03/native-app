import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentCity = async () => {
  try {
    // check if location already stored
    const cachedCity = await AsyncStorage.getItem('user_city');
    if (cachedCity) {
      return cachedCity;
    }

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;

    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const city =
            data?.address?.city || data?.address?.town || data?.address?.state || null;

          if (city) {
            await AsyncStorage.setItem('user_city', city);
          }

          resolve(city);
        },
        (error) => {
          console.warn('Location error:', error.message);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
        }
      );
    });
  } catch (error) {
    console.error('Location Error:', error);
    return null;
  }
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

// Optional helper to clear city cache
export const clearCityCache = async () => {
  await AsyncStorage.removeItem('user_city');
};
