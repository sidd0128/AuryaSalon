import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import StarRatingInput from '../StarRatingInput';
import CustomAlert from '../CustomAlert';

import { styles } from './styles';
import { AlertInfo } from './types';


const RatingModal = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const handleSubmit = () => {
    onClose();
    setAlertInfo({
      title: 'Thank You!',
      message: 'Thanks for your review.',
      variant: 'success',
    });
    setRating(0);
    setComment('');
  };

  return (
    <>
      <View style={styles.ratingSection}>
        <Text style={styles.label}>Your Rating</Text>
        <StarRatingInput rating={rating} setRating={setRating} />
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.label}>Your Comment</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Tell us about your experience..."
          placeholderTextColor={styles.placeholderColor.color}
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>

      {alertInfo && (
        <CustomAlert
          visible={!!alertInfo}
          onClose={() => setAlertInfo(null)}
          {...alertInfo}
        />
      )}
    </>
  );
};

export default RatingModal;

