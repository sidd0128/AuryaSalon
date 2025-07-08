import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AlertVariant } from '../../components/CustomAlert/types';
import { RootStackParamList } from '../../navigation/types';

export type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;