import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { colors } from '../../theme/colors';

interface TabItem {
  icon: string;
  label: string;
}

interface Props {
  tabs: TabItem[];
}

const BottomTabBar: React.FC<Props> = ({ tabs }) => {
  return (
    <View style={styles.bottomNav}>
      {tabs.map(({ icon, label }) => (
        <TouchableOpacity key={icon} style={styles.navItem}>
          <Icon name={icon} size={24} color={colors.textSecondary} />
          <Text style={styles.navText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabBar;
