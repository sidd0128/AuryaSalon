// index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { styles } from './styles';
import { AlertInfo, Props } from './types';
import { useCart } from '../../context/CartContext';
import { Booking, CartItem } from '../../navigation/types';
import generateId from '../../helpers/generateId';
import TimeSlots from '../../components/TimeSlots';
import CustomAlert from '../../components/CustomAlert';
import { generateAvailableSlots } from '../../helpers/bookingUtils';

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

  const updateSlots = useCallback(() => {
    const slots = generateAvailableSlots(
      date,
      bookings,
      cart.salonName,
      SLOT_INTERVAL_MINUTES,
      WORK_START_HOUR,
      WORK_END_HOUR
    );
    setAvailableSlots(slots);
    setSelectedSlot(null);
  }, [date, bookings, cart.salonName]);

  useEffect(() => {
    updateSlots()
  }, [generateAvailableSlots]);

  const toggleCalendar = () => setCalendarVisible((prev) => !prev);

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
      <TimeSlots<Date>
        slots={availableSlots}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlot}
        clickable={true}
        keyExtractor={(slot) => slot.toISOString()}
        labelExtractor={(slot) =>
          slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        isSelected={(slot, selected) => selected?.getTime() === slot.getTime()}
      />

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

export default BookingScreen;
