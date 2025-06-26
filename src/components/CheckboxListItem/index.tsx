import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { colors } from '../../theme/colors';

interface CheckboxListItemProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const CheckboxListItem: React.FC<CheckboxListItemProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Icon
        name={isSelected ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={isSelected ? colors.primary : colors.textSecondary}
      />
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxListItem;
