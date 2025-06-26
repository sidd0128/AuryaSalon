import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import BaseCard from '../BaseCard.tsx';

export interface ReviewCardProps {
  image: any;
  name: string;
  rating: string;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ image, name, rating, comment }) => {
  const renderStars = (ratingStr: string) => {
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

  return (
    <BaseCard>
      <View style={styles.reviewContainer}>
        <Image source={image} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {renderStars(rating)}
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
    </BaseCard>
  );
};

export default ReviewCard;
