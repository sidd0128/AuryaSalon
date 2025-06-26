export type AlertVariant = 'message' | 'warning' | 'error' | 'success' | 'confirmation';

export interface CustomAlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
