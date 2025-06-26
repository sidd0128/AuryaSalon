import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { CustomAlertProps, AlertVariant } from './types';
import { colors } from '../../theme/colors';

const getVariantStyles = (variant: AlertVariant = 'message') => {
  switch (variant) {
    case 'error':
      return {
        backgroundColor: colors.error,
        textColor: colors.textOnPrimary,
        iconName: 'error-outline',
      };
    case 'warning':
      return {
        backgroundColor: colors.warning,
        textColor: colors.text,
        iconName: 'warning',
      };
    case 'success':
      return {
        backgroundColor: colors.success,
        textColor: colors.textOnPrimary,
        iconName: 'check-circle-outline',
      };
    case 'confirmation':
      return {
        backgroundColor: colors.primary,
        textColor: colors.textOnPrimary,
        iconName: 'help-outline',
      };
    default:
      return {
        backgroundColor: colors.surface,
        textColor: colors.text,
        iconName: 'info-outline',
      };
  }
};

const CustomAlert: React.FC<
  CustomAlertProps & { visible: boolean; onClose: () => void }
> = ({
  visible,
  onClose,
  variant = 'message',
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!visible) {
    return null;
  }

  const variantStyles = getVariantStyles(variant);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.customContainer, { backgroundColor: variantStyles.backgroundColor }]}>
          <View style={styles.titleRow}>
            <Icon
              name={variantStyles.iconName}
              size={20}
              color={variantStyles.textColor}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.customTitle, { color: variantStyles.textColor }]}>
              {title || variant.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.customMessage, { color: variantStyles.textColor }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.deepSpace }]}
              onPress={handleConfirm}
            >
              <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
