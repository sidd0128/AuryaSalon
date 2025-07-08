import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { AlertVariant } from '../../components/CustomAlert/types';

export type BookingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
export type BookingScreenRouteProp = RouteProp<RootStackParamList, 'Booking'>;

export type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
};

export interface Props {
  navigation: BookingScreenNavigationProp;
  route: BookingScreenRouteProp;
}