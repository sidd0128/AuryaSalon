import { Animated } from 'react-native';
import SplashScreenNative from 'react-native-splash-screen';

const SPLASH_DURATION_MS = 3000;

export const handleSplashAnimation = (
  fadeAnim: Animated.Value,
  onComplete: () => void
) => {
  // Hide native splash
  if (SplashScreenNative?.hide) {
    SplashScreenNative.hide();
  } else {
    console.warn('react-native-splash-screen is not properly linked or initialized.');
  }

  // Start fade-in animation
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true,
  }).start();

  // Set timeout for screen transition
  const timer = setTimeout(onComplete, SPLASH_DURATION_MS);
  return () => clearTimeout(timer);
};
