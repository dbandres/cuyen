
import { Platform } from 'react-native';
import { check, request, PERMISSIONS } from 'react-native-permissions';

export const checkLocationPermissions = async () => {
  let permissionsStatus;

  if (Platform.OS === 'ios') {
    permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (permissionsStatus === 'granted' && Platform.Version >= 29) {
      const backgroundPermissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
      );

      if (backgroundPermissionStatus !== 'granted') {
        permissionsStatus = 'denied';
      }
    }
  }

  if (permissionsStatus !== 'granted') {
    // Si los permisos aún no están otorgados, solicitarlos
    if (Platform.OS === 'ios') {
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionsStatus === 'granted' && Platform.Version >= 29) {
        const backgroundPermissionStatus = await request(
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
        );

        if (backgroundPermissionStatus !== 'granted') {
          permissionsStatus = 'denied';
        }
      }
    }
  }

  return permissionsStatus;
};