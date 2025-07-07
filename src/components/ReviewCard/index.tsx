import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import BaseCard from '../BaseCard.tsx';
import { Review } from '../../navigation/types.ts';
import { getRelativeTime } from '../../utils/getRelativeTime.ts';
import { renderStars } from '../../utils/renderStars.tsx';



const ReviewCard: React.FC<Review> = ({ image, name, rating, comment, timestamp }) => {

  return (
    <BaseCard>
      <View style={styles.reviewContainer}>
        <Image source={image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {renderStars(rating)}
          <Text style={styles.comment}>{comment}</Text>
          {timestamp && (
          <Text style={styles.timestamp}>
            {getRelativeTime(timestamp)}
          </Text>
)}
        </View>
      </View>
    </BaseCard>
  );
};

export default ReviewCard;
