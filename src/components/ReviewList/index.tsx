import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { styles } from './styles';
import ReviewCard from '../ReviewCard';
import { ReviewListProps } from './types';

const ReviewList: React.FC<ReviewListProps> = ({ reviews, title = 'Customer Reviews', limit }) => {
  const [showAll, setShowAll] = useState(false);

  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.emptyText}>No Customer Reviews Yet</Text>
      </View>
    );
  }

  const visibleReviews = limit && !showAll ? reviews.slice(0, limit) : reviews;

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewCard
            id={item.id}
            timestamp={item.timestamp}
            image={item.image}
            name={item.name}
            rating={item.rating}
            comment={item.comment}
          />
        )}
      />
      {limit && reviews.length > limit && (
        <TouchableOpacity onPress={() => setShowAll(!showAll)} style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>{showAll ? 'View Less' : 'View More'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReviewList;
