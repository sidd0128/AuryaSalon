import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { TimeSlotsProps } from './types';

function TimeSlots<T>({
  slots,
  selectedSlot,
  onSelectSlot,
  clickable = false,
  keyExtractor,
  labelExtractor,
  isSelected,
}: TimeSlotsProps<T>) {
  if (slots.length === 0) {
    return (
      <Text style={{ fontStyle: 'italic', color: '#999', marginTop: 8 }}>
        No available slots for this day.
      </Text>
    );
  }

  return (
    <FlatList
      data={slots}
      keyExtractor={keyExtractor}
      numColumns={3}
      renderItem={({ item }) => {
        const selected = isSelected ? isSelected(item, selectedSlot) : false;
        const SlotWrapper = clickable ? TouchableOpacity : View;
        return (
          <SlotWrapper
            onPress={clickable && onSelectSlot ? () => onSelectSlot(item) : undefined}
            style={[styles.slotButton, selected && styles.slotButtonSelected]}
          >
            <Text style={selected ? styles.slotTextSelected : styles.slotText}>
              {labelExtractor(item)}
            </Text>
          </SlotWrapper>
        );
      }}
    />
  );
}



export default TimeSlots;
