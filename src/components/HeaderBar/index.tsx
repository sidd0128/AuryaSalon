import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useCart } from '../../context/CartContext';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface HeaderBarProps {
  location?: string;
  onLocationPress?: () => void;
  title?: string;
  onBackPress?: () => void;
  showOffers?: boolean;
  showCart?: boolean;
  showProfile?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  location,
  onLocationPress,
  title,
  onBackPress,
  showOffers = true,
  showCart = true,
  showProfile = true,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart } = useCart();
  const cartItemCount = cart?.items.length || 0;

  return (
    <View style={styles.header}>
      {title ? (
        <TouchableOpacity onPress={onBackPress} style={styles.leftButton} accessibilityLabel="Back">
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ) : location ? (
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={onLocationPress}
          accessibilityLabel="Location"
        >
          <Icon name="location-on" size={20} color={colors.primary} />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.leftPlaceholder} />
      )}

      {title ? (
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      ) : null}

      <View style={styles.iconContainer}>
        {showOffers && (
          <TouchableOpacity style={styles.iconButton} accessibilityLabel="Offers">
            <Icon name="local-offer" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}

        {showCart && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Cart')}
            accessibilityLabel="Cart"
          >
            <Icon name="shopping-cart" size={24} color={colors.text} />
            {cartItemCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {showProfile && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('MyAccount')}
            accessibilityLabel="Profile"
          >
            <Icon name="person" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderBar;
