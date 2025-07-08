import React, { useEffect, useCallback, useRef } from 'react';
import {
  View,
  ImageBackground,
  StatusBar,
  Animated,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SplashScreenNavigationProp } from './types';
import { styles } from './styles';
import theme from '../../theme';
import { handleSplashAnimation } from '../../helpers/splash';


const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  const goToRegister = useCallback(() => {
    navigation.replace('Register');
  }, [navigation]);

  useEffect(() => {
    const cleanup = handleSplashAnimation(fadeAnim, goToRegister);
    return cleanup;
  }, [fadeAnim, goToRegister]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.statusBar}
      />
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, width, height }]}>
        <ImageBackground
          source={require('../../assets/images/splash.png')}
          style={{ ...StyleSheet.absoluteFillObject }}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
