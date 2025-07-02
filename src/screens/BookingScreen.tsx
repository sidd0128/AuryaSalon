import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

import { Booking, CartItem, RootStackParamList } from '../navigation/types';
import generateId from '../helpers/generateId';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/colors';
import CustomAlert from '../components/CustomAlert';
import { AlertVariant } from '../components/CustomAlert/types';
import Typography from '../theme/typography';

type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
};

interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}

const SLOT_INTERVAL_MINUTES = 30;
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 22;

const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cart } = route.params;
  const { dispatch: dispatchCart } = useCart();

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await AsyncStorage.getItem('bookings');
      setBookings(data ? JSON.parse(data) : []);
    };
    loadBookings();
  }, []);

  const generateAvailableSlots = useCallback(() => {
    const slots: Date[] = [];
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    for (let hour = WORK_START_HOUR; hour < WORK_END_HOUR; hour++) {
      for (let min = 0; min < 60; min += SLOT_INTERVAL_MINUTES) {
        const slot = new Date(selectedDate);
        slot.setHours(hour, min, 0, 0);
        if (slot > new Date()) {
          slots.push(slot);
        }
      }
    }

    const busySlots = bookings
      .filter(
        (b) =>
          b.salonName === cart.salonName &&
          new Date(b.date).toDateString() === selectedDate.toDateString()
      )
      .map((b) => new Date(b.date).getTime());

    const freeSlots = slots.filter((slot) => !busySlots.includes(slot.getTime()));

    setAvailableSlots(freeSlots);
    setSelectedSlot(null);
  }, [date, bookings, cart.salonName]);

  useEffect(() => {
    generateAvailableSlots();
  }, [generateAvailableSlots]);


  const toggleCalendar = () => setCalendarVisible(prev => !prev);


  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setAlertInfo({
        variant: 'error',
        title: 'Invalid Date',
        message: 'Cannot select a past date.',
      });
    } else {
      setDate(selectedDate);
      toggleCalendar();
    }
  };

  const saveBooking = async () => {
    if (!customerName.trim()) {
      setAlertInfo({
        variant: 'warning',
        title: 'Missing Information',
        message: 'Please enter your name.',
      });
      return;
    }
  
    if (!selectedSlot) {
      setAlertInfo({
        variant: 'warning',
        title: 'Missing Information',
        message: 'Please select a time slot.',
      });
      return;
    }
  
    try {
      const newBookings = cart.items.map((item: CartItem) => ({
        id: generateId(),
        customerName,
        salonName: cart.salonName,
        serviceName: item.name,
        date: selectedSlot.toISOString(),
        price: item.price,
        duration: item.duration,
      }));
  
      const existingData = await AsyncStorage.getItem('bookings');
      const existingBookings = existingData ? JSON.parse(existingData) : [];
      const updatedBookings = [...existingBookings, ...newBookings];
  
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));

      dispatchCart({ type: 'CLEAR_CART' });
  
      setAlertInfo({
        variant: 'success',
        title: 'Booking confirmed!',
        message: `You booked ${cart.items.length} services at ${cart.salonName} on ${selectedSlot.toLocaleString()}`,
        onConfirm: () => navigation.navigate('SearchSalons', {}),
      });
    } catch (error) {
      console.error('Error saving booking:', error);
      setAlertInfo({
        variant: 'error',
        title: 'Error',
        message: 'Failed to save booking.',
      });
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book Appointment</Text>

      <Text style={styles.label}>Salon:</Text>
      <Text style={styles.value}>{cart.salonName}</Text>

      <Text style={styles.label}>Selected Treatments:</Text>
      {cart.items.map((item: CartItem) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDetail}>Price: ₹{item.price} + GST</Text>
          <Text style={styles.cardDetail}>Duration: {item.duration} mins</Text>
        </View>
      ))}

      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        placeholder="Enter your name"
        value={customerName}
        onChangeText={setCustomerName}
        style={styles.input}
      />

      <Text style={styles.label}>Select Date:</Text>
      <Pressable onPress={toggleCalendar} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
      </Pressable>

      {isCalendarVisible && (
        <View style={{ marginVertical: 10 }}>
          <Calendar
            markedDates={{
              [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#00BFFF' },
            }}
            onDayPress={handleDateSelect}
            minDate={new Date().toISOString().split('T')[0]}
            disableAllTouchEventsForDisabledDays
          />
          <View style={{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
            <Button title="Done" onPress={toggleCalendar} />
          </View>
        </View>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>Available Time Slots:</Text>
      {availableSlots.length === 0 ? (
        <Text style={{ fontStyle: 'italic', color: '#999' }}>
          No available slots for this day.
        </Text>
      ) : (
        <FlatList
          data={availableSlots}
          keyExtractor={(item) => item.toISOString()}
          numColumns={3}
          renderItem={({ item }) => {
            const isSelected = selectedSlot?.getTime() === item.getTime();
            return (
              <TouchableOpacity
                onPress={() => setSelectedSlot(item)}
                style={[styles.slotButton, isSelected && styles.slotButtonSelected]}
              >
                <Text style={isSelected ? styles.slotTextSelected : styles.slotText}>
                  {item.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <View style={{ marginTop: 30 }}>
        <Button title="Confirm Booking" onPress={saveBooking} />
      </View>

      {alertInfo && (
        <CustomAlert
          visible={!!alertInfo}
          onClose={() => setAlertInfo(null)}
          {...alertInfo}
        />
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    backgroundColor: colors.background 
  },
  header: { 
    ...Typography.h1,
    marginBottom: 20, 
    textAlign: 'center', 
    color: colors.starlight,
  },
  label: { 
    ...Typography.h3,
    marginTop: 12, 
  },
  value: { 
    ...Typography.body,
    marginBottom: 8, 
    color: colors.textSecondary,
  },
  input: {
    ...Typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  dateButton: {
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 6,
    marginTop: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateButtonText: {
    ...Typography.body,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...Typography.h3,
  },
  cardDetail: {
    ...Typography.label2,
    color: colors.textSecondary,
    marginTop: 2,
  },
  slotButton: {
    flex: 1,
    margin: 6,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  slotButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  slotText: {
    ...Typography.label1,
    color: colors.text,
  },
  slotTextSelected: {
    ...Typography.label1,
    color: colors.textOnPrimary,
    fontWeight: '700',
  },
});



export default BookingScreen;
