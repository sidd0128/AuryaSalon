import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AlertVariant } from '../../components/CustomAlert/types';

export type Props = NativeStackScreenProps<RootStackParamList, 'ChangeLocation'>;

export interface LocationItem {
  id: string;
  name: string;
}

export type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};