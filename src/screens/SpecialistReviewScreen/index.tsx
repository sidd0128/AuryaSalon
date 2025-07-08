import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { Props } from './types';
import { styles } from './styles';
import HeaderBar from '../../components/HeaderBar';
import { colors } from '../../theme/colors';
import ReviewList from '../../components/ReviewList';

const SpecialistReviewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { reviews: passedReviews } = route.params;

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(passedReviews);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Reviews" onBackPress={() => navigation.goBack()} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </SafeAreaView>
  );
};

export default SpecialistReviewScreen;
