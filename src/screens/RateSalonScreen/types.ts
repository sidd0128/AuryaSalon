import { AlertVariant } from '../../components/CustomAlert/types';

export type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
};

export type PickerMode = 'salon' | 'category' | null;
