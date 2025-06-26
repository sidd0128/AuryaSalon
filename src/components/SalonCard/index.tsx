import React from 'react';
import { Text, Image, View, Dimensions } from 'react-native';
import { getSalonImage } from '../../helpers/imageMapper';
import { priceLevelToSymbol } from '../../helpers/priceLevel';
import { Salon } from '../../navigation/types';
import { styles } from './styles';
import BaseCard from '../BaseCard.tsx';

const screenWidth = Dimensions.get('window').width;

interface Props {
  salon: Salon;
  onPress: () => void;
}

const SalonCard: React.FC<Props> = ({ salon, onPress }) => {
  const imageSource = getSalonImage(salon.imageKey);

  return (
    <BaseCard onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={[styles.image, { width: screenWidth - 16 }]} />
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Get 40% OFF via Salon Veda</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{salon.name}</Text>
        <Text style={styles.location}>{salon.location}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Unisex</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>{priceLevelToSymbol[salon.priceLevel]}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>
            {typeof salon.rating === 'number' ? salon.rating.toFixed(1) : '0.0'}
          </Text>
        </View>
      </View>
    </BaseCard>
  );
};

export default SalonCard;
