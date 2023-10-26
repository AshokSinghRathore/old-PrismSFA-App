import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import { Platform } from 'react-native';
export async function checkLocationPermission() {
  const status = await check(Platform.OS==="android"?PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION:PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  switch (status) {
    case RESULTS.GRANTED:
      //console.log('Location permission is granted');
      return true;
    case RESULTS.DENIED:
     // console.log('Location permission is denied');
      return false;
    case RESULTS.BLOCKED:
      //console.log('Location permission is blocked');
      return false;
    default:
      return false;
  }
}


export async function requestLocationPermission() {

    const status = await request(Platform.OS==="android"?PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION:PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);


    if (status === RESULTS.GRANTED) {
     // console.log('Location permission granted');
      return true; 
    } else {
      //console.log('Location permission denied or blocked');
      return false; 
    }
  
}
