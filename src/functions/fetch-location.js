import Geolocation from '@react-native-community/geolocation';

export function getLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({latitude, longitude});
      },
      error => {
        reject(error);
      },
    );
  });
}
