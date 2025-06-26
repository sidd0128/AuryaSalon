import React, { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { styles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  images: string[];
};

const SalonImageCarousel: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return <Image source={{ uri: images[0] }} style={styles.image} />;
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={screenWidth}
        height={200}
        data={images}
        scrollAnimationDuration={500}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        onSnapToItem={(index) => setCurrentIndex(index)}
        loop
      />

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SalonImageCarousel;
