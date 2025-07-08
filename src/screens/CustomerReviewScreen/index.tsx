import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { styles } from './styles';
import { colors } from '../../theme/colors';
import ReviewList from '../../components/ReviewList';
import { StoredReview } from './types';
import { getCombinedAndSortedReviews } from '../../helpers/customerReviews';

const CustomerReviewScreen: React.FC = () => {
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      const sortedReviews = await getCombinedAndSortedReviews();
      setReviews(sortedReviews);
      setLoading(false);
    };

    if (isFocused) {
      loadReviews();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </View>
  );
};

export default CustomerReviewScreen;
