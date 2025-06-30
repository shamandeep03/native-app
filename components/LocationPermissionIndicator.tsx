import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocationPermission } from '../hooks/useLocationPermission';

interface LocationPermissionIndicatorProps {
  showRequestButton?: boolean;
  onPermissionGranted?: () => void;
}

export const LocationPermissionIndicator: React.FC<LocationPermissionIndicatorProps> = ({
  showRequestButton = false,
  onPermissionGranted,
}) => {
  const { permissionGranted, isLoading, requestPermission } = useLocationPermission();

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted && onPermissionGranted) {
      onPermissionGranted();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.text}>Checking location permission...</Text>
      </View>
    );
  }

  if (permissionGranted) {
    return (
      <View style={styles.container}>
        <Ionicons name="location" size={16} color="#4CAF50" />
        <Text style={styles.text}>Location access granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={16} color="#F44336" />
      <Text style={styles.text}>Location access required</Text>
      {showRequestButton && (
        <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
}); 