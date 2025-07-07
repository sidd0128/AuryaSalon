export interface TimeSlotsProps<T> {
  slots: T[];
  selectedSlot: T | null;
  onSelectSlot?: (slot: T) => void;
  clickable?: boolean;

  keyExtractor: (slot: T) => string;
  labelExtractor: (slot: T) => string;
  isSelected?: (slot: T, selectedSlot: T | null) => boolean;
}
