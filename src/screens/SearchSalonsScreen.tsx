import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import SalonCard from '../components/SalonCard';
import SalonFilter from '../components/SalonFilter';
import { useSalonFilters } from '../hooks/useSalonFilters';
import { useBottomSheetModal } from '../hooks/useBottomSheetModal';

import { RootStackParamList, Salon, Booking } from '../navigation/types';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchSalons'>;
type RoutePropType = RouteProp<RootStackParamList, 'SearchSalons'>;

const SearchSalonsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();

  const [salons, setSalons] = useState<Salon[]>([]);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState<string>('Sector 24, Gurgaon');
  const [hasUpcomingBooking, setHasUpcomingBooking] = useState(false);

  const {
    minRating,
    priceRange,
    onlyUnisex,
    setMinRating,
    setPriceRange,
    setOnlyUnisex,
    filteredSalons,
    resetFilters,
  } = useSalonFilters(salons, searchText);

  const { openSheet, BottomSheetModal } = useBottomSheetModal();

  useEffect(() => {
    const fetchSalons = async () => {
      const data = await AsyncStorage.getItem('salons');
      const parsed = data ? JSON.parse(data) : [];
      setSalons(parsed);
    };

    const checkUpcomingBookings = async () => {
      try {
        const data = await AsyncStorage.getItem('bookings');
        const bookings: Booking[] = data ? JSON.parse(data) : [];
        const now = new Date();
        const upcoming = bookings.filter((b) => new Date(b.date) > now);
        setHasUpcomingBooking(upcoming.length > 0);
      } catch (err) {
        console.error('Error checking bookings', err);
      }
    };

    fetchSalons();
    checkUpcomingBookings();

    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderBar
          location={location}
          onLocationPress={() => navigation.navigate('ChangeLocation')}
        />

<View style={styles.searchFilterRow}>
  <View style={styles.searchBarContainer}>
    <SearchBar
      placeholder="Search for salons or services"
      onChangeText={setSearchText}
      value={searchText}
    />
  </View>
  <TouchableOpacity onPress={openSheet} style={styles.filterButton}>
    <Icon name="tune" size={24} color={colors.primary} />
  </TouchableOpacity>
</View>

        {hasUpcomingBooking && (
          <TouchableOpacity
            style={styles.bookingCard}
            onPress={() => navigation.navigate('MyAppointments')}
          >
            <View style={styles.cardContent}>
              <Icon name="event-available" size={24} color={colors.primary} />
              <Text style={styles.cardText}>You have upcoming appointments</Text>
              <Icon name="chevron-right" size={24} color={colors.primary} />
            </View>
          </TouchableOpacity>
        )}

        <FlatList
          data={filteredSalons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SalonCard
              salon={item}
              onPress={() => navigation.navigate('SalonInfo', { salon: item })}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No salons found.</Text>}
          showsVerticalScrollIndicator={false}
        />

        <BottomSheetModal>
          <SalonFilter
            minRating={minRating}
            priceRange={priceRange}
            onlyUnisex={onlyUnisex}
            onMinRatingChange={setMinRating}
            onPriceRangeChange={setPriceRange}
            onToggleUnisex={() => setOnlyUnisex((prev) => !prev)}
            onReset={resetFilters}
          />
        </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginHorizontal: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default SearchSalonsScreen;
