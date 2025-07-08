import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useMarqueeAnimation(textWidth: number, containerWidth: number) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (textWidth === 0 || containerWidth === 0) return;

    animatedValue.setValue(containerWidth);

    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -textWidth,
        duration: 12000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, [textWidth, containerWidth, animatedValue]);

  return animatedValue;
}
