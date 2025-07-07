import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../theme';

const { colors, spacing } = theme;

export const renderStars = (ratingStr: string) => {
  const ratingNum = parseFloat(ratingStr);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Icon key={`full-${i}`} name="star" size={16} color={colors.starLight} />);
  }

  if (hasHalfStar) {
    stars.push(<Icon key="half" name="star-half-full" size={16} color={colors.starLight} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Icon key={`empty-${i}`} name="star-o" size={16} color={colors.starLight} />);
  }

  return <View style={styles.starsContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
});
