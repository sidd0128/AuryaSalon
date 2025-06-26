import AsyncStorage from '@react-native-async-storage/async-storage';
import { salons } from '../data/salons';

export const preloadStaticData = async () => {
  try {
    await AsyncStorage.setItem('salons', JSON.stringify(salons));
  } catch (error) {
    console.error('Error preloading salon data:', error);
  }
};
