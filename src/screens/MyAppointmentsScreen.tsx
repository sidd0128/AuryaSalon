import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { filterAndGroupBookings, getSortedBookings } from '../helpers/myAppointments';
import GroupedSectionList from '../components/GroupedSectionList';
import { Booking, RootStackParamList } from '../navigation/types';
import MyAppointmentBookingListItem from '../components/MyAppointmentBookingListItem';
import CustomAlert from '../components/CustomAlert';
import { colors } from '../theme/colors';
import Typography from '../theme/typography';

import { AlertVariant } from '../components/CustomAlert/types';

type Tab = 'upcoming' | 'history';

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const MyAppointmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        const parsed: Booking[] = data ? JSON.parse(data) : [];
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

  const renderBookingItem = ({ item }: { item: Booking }) => (
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
          showToggleIcon={true}
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
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...Typography.label1,
    color: colors.text,
  },
  activeTabText: {
    ...Typography.label1,
    color: colors.textOnPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    ...Typography.body,
    flex: 1,
    height: 44,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceName: {
    ...Typography.h2,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cancelButtonText: {
    ...Typography.caption1,
    color: colors.textOnPrimary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    ...Typography.label2,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceLabel: {
    ...Typography.label2,
    color: colors.textSecondary,
  },
  priceValue: {
    ...Typography.label1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    ...Typography.body,
    color: colors.textSecondary,
  },
});



export default MyAppointmentsScreen;