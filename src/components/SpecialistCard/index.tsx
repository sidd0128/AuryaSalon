import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Specialist } from './types';
import { getSpecialistImage } from '../../helpers/imageMapper';

interface Props {
  specialist: Specialist;
  onPress: () => void;
}

const SpecialistCard: React.FC<Props> = ({ specialist, onPress }) => {
  const imageSource = getSpecialistImage(specialist.imageKey);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{specialist.name}</Text>
        <Text style={styles.specialty} numberOfLines={1}>{specialist.specialty}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>
              {specialist.rating.toFixed(1)}
            </Text>
          </View>
          
          <Text style={styles.dot}>•</Text>
          
          <Text style={styles.experience}>
            {specialist.experience} {typeof specialist.experience === 'number' ? 'yrs' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SpecialistCard;