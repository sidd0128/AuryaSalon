import React, { useEffect, useCallback, useRef } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SplashScreenNative from 'react-native-splash-screen';
import { RootStackParamList } from '../navigation/types';
import theme from '../theme';

const SPLASH_DURATION_MS = 3000;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  const goToRegister = useCallback(() => {
    navigation.replace('Register');
  }, [navigation]);

  useEffect(() => {
    // Hide the native splash screen ASAP
    if (SplashScreenNative && SplashScreenNative.hide) {
      SplashScreenNative.hide();
    } else {
      console.warn('react-native-splash-screen is not properly linked or initialized.');
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(goToRegister, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [fadeAnim, goToRegister]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" 
        backgroundColor={theme.colors.statusBar}
      />
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, width, height }]}>
        <ImageBackground
          source={require('../assets/images/splash.png')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // fallback bg color
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default SplashScreen;
