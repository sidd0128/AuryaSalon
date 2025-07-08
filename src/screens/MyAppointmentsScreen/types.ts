import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { AlertVariant } from '../../components/CustomAlert/types';

export type Tab = 'upcoming' | 'history';

export type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export type Navigation = NavigationProp<RootStackParamList>;
