import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Booking } from '../../navigation/types';
import { canCancelBooking } from '../../helpers/myAppointments';
import styles from './styles';

interface Props {
  item: Booking;
  activeTab: 'upcoming' | 'history';
  onCancelPress: (id: string) => void;
}

const MyAppointmentBookingListItem: React.FC<Props> = ({ item, activeTab, onCancelPress }) => {
  const date = new Date(item.date);
  const isCancelable = canCancelBooking(date);

  return (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        {activeTab === 'upcoming' && isCancelable && (
          <TouchableOpacity onPress={() => onCancelPress(item.id)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.detailRow}>
        <Icon name="event" size={16} color="#666" />
        <Text style={styles.detailText}>{date.toDateString()}</Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="schedule" size={16} color="#666" />
        <Text style={styles.detailText}>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.duration} mins
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Amount Paid:</Text>
        <Text style={styles.priceValue}>₹{item.price}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Discount:</Text>
        <Text style={styles.priceValue}>₹0</Text>
      </View>
    </View>
  );
};

export default MyAppointmentBookingListItem;
