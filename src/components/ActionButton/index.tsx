import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { colors } from '../../theme/colors';

type Props = {
  icon: string;
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
};

const ActionButton: React.FC<Props> = ({ icon, label, style, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Icon 
        name={icon} 
        size={20} 
        color={colors.primary} 
        style={styles.icon} 
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
