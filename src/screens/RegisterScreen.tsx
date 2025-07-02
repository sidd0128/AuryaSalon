import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import Typography from '../theme/Typography';

const { width, height } = Dimensions.get('window');

const BrandContainer = () => {
  const translateY = useSharedValue(0);
  const imageSize = (width - 48) / 3;

  const brandImages = Array(18).fill(require('../assets/hair_salon_icon.png'));

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-imageSize * 3, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [imageSize]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const renderGrid = () => (
    <View>
      {[...Array(3)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {brandImages.slice(rowIndex * 3, rowIndex * 3 + 3).map((imgSrc, i) => (
            <Image
              key={`${rowIndex}-${i}`}
              source={imgSrc}
              style={[styles.brandImage, { width: imageSize, height: imageSize }]}
            />
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.brandFrame}>
      <Animated.View style={animatedStyle}>
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>{renderGrid()}</React.Fragment>
        ))}
      </Animated.View>
    </View>
  );
};

const RegisterScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const { dispatch } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isValid = mobileNumber.trim().length === 10;

  const handleContinue = async () => {
    const user = { id: Date.now().toString(), mobile: mobileNumber, type: 'customer' };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
    navigation.navigate('SearchSalons', {});
  };

  const animatedBtn = useAnimatedStyle(() => ({
    opacity: withTiming(isValid ? 1 : 0.5, { duration: 300 }),
    transform: [{ scale: withTiming(isValid ? 1 : 0.95) }],
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View entering={FadeIn.duration(400)}>
              <BrandContainer />
              <Text style={styles.heading}>Luxury You Aspire</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(200).duration(400)}>
              <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor={colors.placeholder}
                  value={mobileNumber}
                  onChangeText={(text) => {
                    const filtered = text.replace(/[^0-9]/g, '');
                    setMobileNumber(filtered);
                  }}
                  keyboardType="numeric"
                  returnKeyType="done"
                  maxLength={10}
                  autoFocus
                />
              </View>

              <Animated.View style={animatedBtn}>
                <Pressable
                  onPress={handleContinue}
                  disabled={!isValid}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </Animated.View>

              <Text style={styles.termsText}>
                By continuing you agree to our{' '}
                <Text style={styles.link}>Terms of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>

              <Pressable onPress={() => {}}>
                <Text style={styles.supportText}>
                  Having issues signing up?{' '}
                  <Text style={styles.link}>Contact Support</Text>
                </Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('SearchSalons', {})}>
                <Text style={styles.guestText}>Continue as guest</Text>
              </Pressable>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingTop: 10,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  brandFrame: {
    height: height * 0.35,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  brandImage: {
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: colors.surface,
  },
  heading: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.surface,
    marginBottom: 20,
    height: 52,
  },
  countryCode: {
    ...Typography.body,
    marginRight: 10,
  },
  input: {
    ...Typography.body,
    flex: 1,
    letterSpacing: 0.5,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    ...Typography.h2,
    color: colors.textOnPrimary,
  },
  termsText: {
    ...Typography.caption1,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  link: {
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  supportText: {
    ...Typography.caption1,
    textAlign: 'center',
    marginBottom: 8,
  },
  guestText: {
    ...Typography.label2,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
});



export default RegisterScreen;