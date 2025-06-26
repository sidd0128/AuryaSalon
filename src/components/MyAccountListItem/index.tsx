import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface ListItemProps {
  iconName?: string;
  iconColor?: string;
  iconSource?: ImageSourcePropType;
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  iconName,
  iconColor = colors.primary,
  iconSource,
  title,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {iconName ? (
        <Icon name={iconName} size={24} color={iconColor} />
      ) : iconSource ? (
        <Image source={iconSource} style={styles.imageIcon} />
      ) : children ? (
        <View style={styles.customIconContainer}>{children}</View>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Icon name="chevron-right" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};

export default ListItem;
