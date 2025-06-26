import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { colors } from '../../theme/colors';

interface PickerButtonProps {
  label: string;
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
}

const PickerButton: React.FC<PickerButtonProps> = ({
  label,
  value,
  onPress,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value || `Select ${label}`}
        </Text>
        <Icon name="arrow-drop-down" size={24} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default PickerButton;
