// index.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GroupedSectionList from '../../components/GroupedSectionList';
import MyAppointmentBookingListItem from '../../components/MyAppointmentBookingListItem';
import CustomAlert from '../../components/CustomAlert';
import { colors } from '../../theme/colors';
import { styles } from './styles';
import { Tab, AlertInfo, Navigation } from './types';
import { filterAndGroupBookings, getSortedBookings } from '../../helpers/myAppointments';
import { Booking } from '../../navigation/types';

const MyAppointmentsScreen: React.FC = () => {
  const isFocused = useIsFocused();

  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchText, setSearchText] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await AsyncStorage.getItem('bookings');
        const parsed = data ? JSON.parse(data) : [];
        setBookings(getSortedBookings(parsed));
      } catch (err) {
        console.error('Failed to load bookings', err);
      }
    };

    if (isFocused) loadBookings();
  }, [isFocused]);

  const handleCancelBooking = useCallback((id: string) => {
    setAlertInfo({
      variant: 'confirmation',
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this appointment?',
      confirmText: 'Yes, Cancel',
      cancelText: 'No',
      onConfirm: async () => {
        try {
          const updated = bookings.filter(b => b.id !== id);
          await AsyncStorage.setItem('bookings', JSON.stringify(updated));
          setBookings(updated);
          setAlertInfo({
            variant: 'success',
            title: 'Success',
            message: 'Your appointment has been cancelled.',
          });
        } catch (err) {
          console.error('Error cancelling booking', err);
          setAlertInfo({
            variant: 'error',
            title: 'Error',
            message: 'Could not cancel the appointment.',
          });
        }
      },
    });
  }, [bookings]);

  const { upcoming, history } = useMemo(() => {
    const now = new Date();
    const upcoming = bookings.filter(b => new Date(b.date) > now);
    const history = bookings.filter(b => new Date(b.date) <= now);
    return {
      upcoming: getSortedBookings(upcoming, 'asc'),
      history: getSortedBookings(history, 'desc'),
    };
  }, [bookings]);

  const displayedData = useMemo(() => {
    const data = activeTab === 'upcoming' ? upcoming : history;
    return filterAndGroupBookings(data, searchText);
  }, [activeTab, upcoming, history, searchText]);

  const renderBookingItem = ({ item }: { item: any }) => (
    <MyAppointmentBookingListItem
      item={item}
      activeTab={activeTab}
      onCancelPress={handleCancelBooking}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['upcoming', 'history'] as Tab[]).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab);
                setSearchText('');
              }}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${activeTab}...`}
            placeholderTextColor={colors.placeholder}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* List */}
        <GroupedSectionList
          sections={displayedData}
          renderItem={renderBookingItem}
          emptyMessage={`No ${activeTab} appointments found.`}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          showToggleIcon
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

export default MyAppointmentsScreen;
