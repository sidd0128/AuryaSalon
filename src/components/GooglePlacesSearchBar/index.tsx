import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TextInputKeyPressEvent,
  Platform,
} from 'react-native';
import { styles } from './styles';

type GooglePlace = {
  place_id: string;
  description: string;
};

type PlaceDetails = {
  formatted_address: string;
};

type GooglePlacesSearchBarProps = {
  placeholder?: string;
  onPlaceSelected: (address: string) => void;
  debounceTime?: number;
};

const GOOGLE_PLACES_API_KEY = 'AIzaSyASHPnilA6fg4FetJkZAqUaZuNjtBmJUyU';

function debounce<F extends (...args: any[]) => void>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

const GooglePlacesSearchBar: React.FC<GooglePlacesSearchBarProps> = ({
  placeholder = 'Search location',
  onPlaceSelected,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<GooglePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<TextInput>(null);

  const autocompleteCache = useRef<Map<string, GooglePlace[]>>(new Map());
  const placeDetailsCache = useRef<Map<string, PlaceDetails>>(new Map());

  const fetchPlaces = useCallback(async (input: string) => {
    if (input.length < 2) {
      setPredictions([]);
      setLoading(false);
      setError(null);
      return;
    }

    if (autocompleteCache.current.has(input)) {
      setPredictions(autocompleteCache.current.get(input)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${GOOGLE_PLACES_API_KEY}&types=geocode&language=en`
      );
      const json = await resp.json();

      if (json.status === 'OK' && json.predictions) {
        const places: GooglePlace[] = json.predictions.map((p: any) => ({
          place_id: p.place_id,
          description: p.description,
        }));
        autocompleteCache.current.set(input, places);
        setPredictions(places);
      } else {
        setPredictions([]);
        setError(json.error_message || 'No results found');
      }
    } catch {
      setPredictions([]);
      setError('Network error');
    }
    setLoading(false);
  }, []);

  const debouncedFetchPlaces = useCallback(
    debounce(fetchPlaces, debounceTime),
    [fetchPlaces, debounceTime]
  );

  useEffect(() => {
    debouncedFetchPlaces(query);
  }, [query, debouncedFetchPlaces]);

  const fetchPlaceDetails = async (place_id: string) => {
    if (placeDetailsCache.current.has(place_id)) {
      return placeDetailsCache.current.get(place_id)!;
    }
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_PLACES_API_KEY}&language=en`
      );
      const json = await resp.json();

      if (json.status === 'OK' && json.result) {
        const details: PlaceDetails = {
          formatted_address: json.result.formatted_address,
        };
        placeDetailsCache.current.set(place_id, details);
        return details;
      }
    } catch {
      // silent fail
    }
    return undefined;
  };

  const onSelect = async (place: GooglePlace) => {
    setQuery(place.description);
    setPredictions([]);
    Keyboard.dismiss();
    const details = await fetchPlaceDetails(place.place_id);
    onPlaceSelected(details?.formatted_address || place.description);
    setSelectedIndex(-1);
  };

  const onKeyPress = (e: TextInputKeyPressEvent) => {
    if (predictions.length === 0) return;

    const key = e.nativeEvent.key;

    if (key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev + 1) % predictions.length);
    } else if (key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev - 1 + predictions.length) % predictions.length);
    } else if (key === 'Enter' || key === 'Return') {
      if (selectedIndex >= 0 && selectedIndex < predictions.length) {
        onSelect(predictions[selectedIndex]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          setSelectedIndex(-1);
        }}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="search"
        onKeyPress={Platform.OS === 'web' ? onKeyPress : undefined}
        accessible
        accessibilityLabel={placeholder}
      />
      {loading && <ActivityIndicator style={{ marginVertical: 8 }} />}
      {error && (
        <TouchableOpacity onPress={() => fetchPlaces(query)} style={styles.errorContainer}>
          <Text style={styles.errorText}>{error} (tap to retry)</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => onSelect(item)}
            >
              <Text style={isSelected ? styles.selectedText : styles.itemText}>
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default GooglePlacesSearchBar;
