import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Linking,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import GooglePlacesSearchBar from '../components/GooglePlacesSearchBar';
import CustomAlert from '../components/CustomAlert';
import { colors } from '../theme/colors';
import { AlertVariant } from '../components/CustomAlert/types';
import { reverseGeocode } from '../helpers/reverseGeocode';
import Typography from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangeLocation'>;

interface LocationItem {
  id: string;
  name: string;
}

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 10;

const ChangeLocationScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<LocationItem[]>([]);
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Failed to load recent searches', e);
      }
    })();
  }, []);

  const saveRecentSearches = async (searches: LocationItem[]) => {
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (e) {
      console.warn('Failed to save recent searches', e);
    }
  };

  const getPlatformPermission = (): Permission | null => {
    return (
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        default: null,
      }) ?? null
    );
  };

  const requestLocationPermission = async () => {
    if (isLoading) return;

    const permission = getPlatformPermission();
    if (!permission) {
      setAlertInfo({
        variant: 'warning',
        title: 'Unsupported Platform',
        message: 'Location permission is not configurable on this platform.',
      });
      return;
    }

    try {
      const result = await check(permission);

      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        getCurrentLocation();
        return;
      }

      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          handleBlockedPermission();
        }
        return;
      }

      if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
        handleBlockedPermission();
      }
    } catch (error) {
      console.warn('Permission error:', error);
      setAlertInfo({
        variant: 'error',
        title: 'Permission Error',
        message: 'An error occurred while checking location permissions.',
      });
    }
  };

  const handleBlockedPermission = () => {
    setAlertInfo({
      variant: 'confirmation',
      title: 'Location Permission Blocked',
      message: 'Location permission has been denied. Please go to app settings to enable it.',
      confirmText: 'Open Settings',
      onConfirm: () => Linking.openSettings(),
      cancelText: 'Cancel',
      onCancel: () => setAlertInfo(null),
    });
  };

  const getCurrentLocation = () => {
    if (isLoading) return;
    setIsLoading(true);

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const address = await reverseGeocode(latitude, longitude);
        setIsLoading(false);

        if (address) {
          handleLocationSelect(address);
        } else {
          setAlertInfo({
            variant: 'error',
            title: 'Location Error',
            message: 'Could not resolve your current location to an address.',
          });
        }
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
        setAlertInfo({
          variant: 'error',
          title: 'Error Fetching Location',
          message: 'Could not get your current location. Please ensure location services are enabled.',
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleLocationSelect = (location: string) => {
    const existingIndex = recentSearches.findIndex(
      (item) => item.name.toLowerCase() === location.toLowerCase()
    );

    let updatedSearches = [...recentSearches];

    if (existingIndex !== -1) {
      const [existing] = updatedSearches.splice(existingIndex, 1);
      updatedSearches.unshift(existing);
    } else {
      updatedSearches.unshift({ id: Date.now().toString(), name: location });

      if (updatedSearches.length > MAX_RECENT_SEARCHES) {
        updatedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);
      }
    }

    setRecentSearches(updatedSearches);
    saveRecentSearches(updatedSearches);

    navigation.navigate('SearchSalons', { location });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Change Location</Text>
          <View style={{ width: 24 }} />
        </View>

        <GooglePlacesSearchBar
          placeholder="Search for area, street name..."
          onPlaceSelected={(location) => handleLocationSelect(location)}
        />

        <TouchableOpacity
          style={[styles.currentLocationButton, isLoading && styles.disabledButton]}
          onPress={requestLocationPermission}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.currentLocationText}>Use My Current Location</Text>
              <Text style={styles.currentLocationSubText}>
                Depending on your internet connectivity, this might take 5-10 seconds
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recentItem} onPress={() => handleLocationSelect(item.name)}>
              <Icon name="history" size={20} color={colors.textSecondary} />
              <Text style={styles.recentText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        {alertInfo && (
          <CustomAlert
            visible={!!alertInfo}
            onClose={() => setAlertInfo(null)}
            {...alertInfo}
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...Typography.h2,
    textAlign: 'center',
    flex: 1,
  },
  currentLocationButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  currentLocationText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
  currentLocationSubText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  disabledButton: {
    opacity: 0.7,
  },
  recentSearchesTitle: {
    ...Typography.h3,
    marginBottom: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentText: {
    ...Typography.label2,
    marginLeft: 8,
  },
});



export default ChangeLocationScreen;
