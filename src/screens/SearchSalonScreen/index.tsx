import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBar from '../../components/HeaderBar';
import SearchBar from '../../components/SearchBar';
import SalonCard from '../../components/SalonCard';
import SalonFilter from '../../components/SalonFilter';
import { useSalonFilters } from '../../hooks/useSalonFilters';
import { useBottomSheetModal } from '../../hooks/useBottomSheetModal';

import { NavigationProp, RoutePropType } from './types';
import { styles } from './styles';
import { Booking, Salon } from '../../navigation/types';
import { colors } from '../../theme/colors';

const fetchSalons = async (setSalons: React.Dispatch<React.SetStateAction<Salon[]>>) => {
  try {
    const data = await AsyncStorage.getItem('salons');
    const parsed = data ? JSON.parse(data) : [];
    setSalons(parsed);
  } catch (err) {
    console.error('Error fetching salons:', err);
  }
};

const checkUpcomingBookings = async (setHasUpcomingBooking: React.Dispatch<React.SetStateAction<boolean>>) => {
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
    fetchSalons(setSalons);
    checkUpcomingBookings(setHasUpcomingBooking);

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

export default SearchSalonsScreen;
