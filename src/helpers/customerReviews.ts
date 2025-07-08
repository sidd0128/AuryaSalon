import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredReview } from '../screens/CustomerReviewScreen/types';

export const staticReviews: StoredReview[] = [
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

export const loadStoredReviews = async (): Promise<StoredReview[]> => {
  try {
    const json = await AsyncStorage.getItem('user_reviews');
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Failed to load user reviews from storage', error);
    return [];
  }
};

export const getCombinedAndSortedReviews = async (): Promise<StoredReview[]> => {
  const storedReviews = await loadStoredReviews();
  const allReviews = [...staticReviews, ...storedReviews];
  return allReviews.sort((a, b) => b.timestamp - a.timestamp);
};
