# Location Permission System

This app implements a comprehensive location permission system that requests location access when the app first renders.

## Features

- **Automatic Permission Request**: Location permission is automatically requested when the app starts
- **Cross-Platform Support**: Works on both Android and iOS
- **User-Friendly Alerts**: Clear messages explaining why location is needed
- **Settings Integration**: Direct links to app settings if permission is permanently denied
- **Visual Indicators**: Shows current permission status throughout the app

## Implementation Details

### 1. Main Layout (`app/_layout.tsx`)
- Uses the `useLocationPermission` hook to automatically request permission on app startup
- Tracks permission status for use throughout the app

### 2. Location Service (`app/(tabs)/src/LocationService.js`)
- Handles Android permissions using `PermissionsAndroid`
- Handles iOS permissions using `expo-location`
- Provides `getCurrentCity()` function to get user's current city
- Includes proper error handling and user guidance

### 3. Custom Hook (`hooks/useLocationPermission.ts`)
- Reusable hook for managing location permissions
- Provides loading states and permission status
- Can be used in any component that needs location access

### 4. Permission Indicator (`components/LocationPermissionIndicator.tsx`)
- Visual component showing current permission status
- Optional request button for manual permission requests
- Different states: loading, granted, denied

## Usage Examples

### Basic Usage in a Component
```tsx
import { useLocationPermission } from '../hooks/useLocationPermission';

const MyComponent = () => {
  const { permissionGranted, isLoading } = useLocationPermission();
  
  if (isLoading) return <Text>Checking permission...</Text>;
  if (!permissionGranted) return <Text>Location access required</Text>;
  
  return <Text>Location access granted!</Text>;
};
```

### Using the Permission Indicator
```tsx
import { LocationPermissionIndicator } from '../components/LocationPermissionIndicator';

const MyScreen = () => {
  return (
    <View>
      <LocationPermissionIndicator showRequestButton={true} />
      {/* Your screen content */}
    </View>
  );
};
```

### Getting Current City
```tsx
import { getCurrentCity } from './LocationService';

const getLocation = async () => {
  const city = await getCurrentCity();
  if (city) {
    console.log('Current city:', city);
  }
};
```

## Configuration

### Android Permissions (app.json)
```json
{
  "android": {
    "permissions": [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION"
    ]
  }
}
```

### Expo Plugins (app.json)
```json
{
  "plugins": ["expo-location"]
}
```

## Permission Flow

1. **App Startup**: Permission is automatically requested when the app first renders
2. **User Response**: User can grant, deny, or ask later
3. **Denied**: Shows alert with option to open settings
4. **Permanently Denied**: Provides direct link to app settings
5. **Granted**: App can access location services

## Error Handling

- Network errors when fetching city data
- GPS not enabled
- Permission denied scenarios
- iOS-specific permission handling
- Android-specific permission handling

## Best Practices

- Always check permission status before accessing location
- Provide clear explanations for why location is needed
- Handle all permission states gracefully
- Use the reusable hook for consistent behavior
- Show visual feedback for permission status 