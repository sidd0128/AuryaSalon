import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/colors';
import { styles } from './styles';

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  maxStars?: number;
  size?: number;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  rating,
  setRating,
  maxStars = 5,
  size = 32,
}) => {
  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, index) => {
        const starNum = index + 1;
        return (
          <TouchableOpacity key={starNum} onPress={() => setRating(starNum)}>
            <Icon
              name={starNum <= rating ? 'star' : 'star-border'}
              size={size}
              color={colors.primary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StarRatingInput;
