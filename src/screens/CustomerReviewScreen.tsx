import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import ReviewCard, { ReviewCardProps } from '../components/ReviewCard';
import { colors } from '../theme/colors';
import Typography from '../theme/typography';


type StoredReview = ReviewCardProps & { id: string; timestamp: number };

const staticReviews: StoredReview[] = [
    {
      id: '1',
      name: 'Customer Review',
      rating: '5',
      comment: 'Excellent service and friendly staff.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-26T10:00:00Z').getTime(),
    },
    {
      id: '2',
      name: 'Customer Review',
      rating: '4.5',
      comment: 'Great atmosphere, will visit again.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-25T11:00:00Z').getTime(),
    },
    {
      id: '3',
      name: 'Customer Review',
      rating: '5',
      comment: 'Highly recommend their treatments!',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-24T12:00:00Z').getTime(),
    },
    {
      id: '4',
      name: 'Customer Review',
      rating: '4',
      comment: 'Good experience, but room for improvement.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-23T13:00:00Z').getTime(),
    },
    {
      id: '5',
      name: 'Customer Review',
      rating: '5',
      comment: 'Professional staff and very clean facility.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-22T14:00:00Z').getTime(),
    },
    {
      id: '6',
      name: 'Customer Review',
      rating: '4.5',
      comment: 'Nice ambiance and quick service.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-21T15:00:00Z').getTime(),
    },
    {
      id: '7',
      name: 'Customer Review',
      rating: '5',
      comment: 'Loved my experience, highly recommended!',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-20T16:00:00Z').getTime(),
    },
    {
      id: '8',
      name: 'Customer Review',
      rating: '4',
      comment: 'Friendly staff but limited parking space.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-19T17:00:00Z').getTime(),
    },
    {
      id: '9',
      name: 'Customer Review',
      rating: '5',
      comment: 'Best salon in town with great prices.',
      image: require('../assets/images/profile.png'),
      timestamp: new Date('2023-10-18T18:00:00Z').getTime(),
    },
  ];
  
const CustomerReviewScreen: React.FC = () => {
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const storedReviewsJson = await AsyncStorage.getItem('user_reviews');
        const storedReviews: StoredReview[] = storedReviewsJson ? JSON.parse(storedReviewsJson) : [];
        
        const allReviews = [...staticReviews, ...storedReviews];
        allReviews.sort((a, b) => b.timestamp - a.timestamp);

        setReviews(allReviews);
      } catch (error) {
        console.error("Failed to load reviews", error);
        setReviews(staticReviews);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      loadReviews();
    }
  }, [isFocused]);

  const hasReviews = reviews.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customer Reviews</Text>
      {loading ? <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} /> : hasReviews ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReviewCard
              image={item.image}
              name={item.name}
              rating={item.rating}
              comment={item.comment}
            />
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No Customer Reviews Yet</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingBottom: 20 },
  heading: {
    ...Typography.h2,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emptyText: {
    ...Typography.label2,
    textAlign: 'center',
    color: colors.textSecondary,
    paddingVertical: 40,
  },
});



export default CustomerReviewScreen;
