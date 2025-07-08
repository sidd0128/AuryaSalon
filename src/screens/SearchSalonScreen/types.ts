import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Salon, Booking } from '../../navigation/types';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SearchSalons'>;
export type RoutePropType = RouteProp<RootStackParamList, 'SearchSalons'>;

export interface SearchSalonsScreenProps {
  navigation: NavigationProp;
  route: RoutePropType;
}
