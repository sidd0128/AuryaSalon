import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import BaseCard from '../BaseCard.tsx';

type Props = {
  category: string;
  count: number;
  image: string;
  children?: React.ReactNode;
};

const CategoryCard: React.FC<Props> = ({ category, count, image, children }) => (
  <BaseCard>
    <View style={styles.header}>
      <Image source={{ uri: image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>
        {category} {count > 0 ? `(${count})` : ''}
      </Text>
      <Icon name="expand-more" size={24} color={colors.text} style={styles.expandIcon} />
    </View>
    {children}
  </BaseCard>
);

export default CategoryCard;
