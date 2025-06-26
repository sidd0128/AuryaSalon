import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export type PriceRange = 'low' | 'medium' | 'high' | null;

interface FilterProps {
  minRating: number | null;
  priceRange: PriceRange;
  onlyUnisex: boolean;
  onMinRatingChange: (value: number | null) => void;
  onPriceRangeChange: (value: PriceRange) => void;
  onToggleUnisex: () => void;
  onReset: () => void;
}

const SalonFilter: React.FC<FilterProps> = ({
  minRating,
  priceRange,
  onlyUnisex,
  onMinRatingChange,
  onPriceRangeChange,
  onToggleUnisex,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Minimum Rating:</Text>
      <View style={styles.optionsRow}>
        {[3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            onPress={() => onMinRatingChange(rating === minRating ? null : rating)}
            style={[
              styles.option,
              minRating === rating && styles.selectedOption,
            ]}
          >
            <Text style={minRating === rating ? styles.selectedText : styles.optionText}>
              {rating}★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price Range:</Text>
      <View style={styles.optionsRow}>
        {(['low', 'medium', 'high'] as PriceRange[]).map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => onPriceRangeChange(range === priceRange ? null : range)}
            style={[
              styles.option,
              priceRange === range && styles.selectedOption,
            ]}
          >
            <Text style={priceRange === range ? styles.selectedText : styles.optionText}>
              {range?.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onToggleUnisex} style={styles.unisexToggle}>
        <Icon
          name={onlyUnisex ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color={colors.primary}
        />
        <Text style={styles.unisexText}>Show only Unisex salons</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SalonFilter;
