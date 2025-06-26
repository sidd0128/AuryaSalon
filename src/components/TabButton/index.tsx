import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: string;
  iconColor?: string;
}

const TabButton: React.FC<Props> = ({ label, isActive, onPress, icon, iconColor }) => (
  <TouchableOpacity
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}
  >
    {icon && (
      <Icon
        name={icon}
        size={20}
        color={iconColor || (isActive ? colors.primary : colors.textSecondary)}
        style={styles.icon}
      />
    )}
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default TabButton;
