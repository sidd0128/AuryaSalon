import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import BaseCard from '../BaseCard.tsx';

interface Props {
  image: string;
  type: string;
  count: number;
}

const PhotoCard: React.FC<Props> = ({ image, type, count }) => (
  <BaseCard>
    <View style={styles.photoItem}>
      <Image source={{ uri: image }} style={styles.photoImage} />
      <Text>{`${type} (${count})`}</Text>
    </View>
  </BaseCard>
);

export default PhotoCard;
