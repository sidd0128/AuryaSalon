
export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<string | null> => {
  try {
    const apiKey = 'AIzaSyASHPnilA6fg4FetJkZAqUaZuNjtBmJUyU';
    if (!apiKey) {
      console.warn('Google Maps API key is missing.');
      return null;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.warn('No address found for coordinates:', lat, lng);
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
