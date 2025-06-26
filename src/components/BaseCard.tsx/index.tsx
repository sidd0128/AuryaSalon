import React from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const BaseCard: React.FC<Props> = ({ children, containerStyle, onPress }) => {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper style={[styles.cardContainer, containerStyle]} onPress={onPress}>
      {children}
    </CardWrapper>
  );
};

export default BaseCard;
