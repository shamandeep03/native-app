import Geolocation from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'To display nearby vendors, this app needs access to your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask Me Later',
        }
      );

      console.log('Permission result:', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Blocked',
          'You have permanently denied location permission. Please open app settings and allow it manually.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return false;
      } else {
        Alert.alert('Permission Denied', 'Location permission was denied.');
        return false;
      }
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Permission Error', error.message);
      return false;
    }
  } else {
    return true; // iOS handled separately
  }
};

export const getCurrentCity = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Location:', latitude, longitude);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.state;

          if (city) {
            console.log('City:', city);
            resolve(city);
          } else {
            Alert.alert(
              'City Not Found',
              'Could not determine city from your location.'
            );
            resolve(null);
          }
        } catch (err) {
          console.error('City fetch error:', err);
          Alert.alert('Error', 'Could not fetch city from location.');
          reject(null);
        }
      },
      (error) => {
        console.error('Location Error:', error.message);
        Alert.alert('Location Error', error.message);
        reject(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });
};
