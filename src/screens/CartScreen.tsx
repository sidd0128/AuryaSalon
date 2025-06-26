import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartItem, RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import CustomAlert from '../components/CustomAlert';
import { AlertVariant } from '../components/CustomAlert/types';

type AlertInfo = {
  variant: AlertVariant;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

const CartScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Cart'>> = ({ navigation }) => {
  const { cart, dispatch } = useCart();
  const [coupon, setCoupon] = useState('');
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const totalPrice = useMemo(() =>
    cart.items.reduce((sum: number, i: CartItem) => sum + i.price, 0),
    [cart]
  );
  
  const totalDuration = useMemo(() =>
    cart.items.reduce((sum: number, i: CartItem) => sum + i.duration, 0),
    [cart]
  );

  const handleRemove = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const handleClearCart = () => {
    setAlertInfo({
      variant: 'confirmation',
      title: 'Clear Cart',
      message: 'Are you sure you want to clear your cart?',
      confirmText: 'Clear',
      cancelText: 'Cancel',
      onConfirm: () => dispatch({ type: 'CLEAR_CART' }),
    });
  };

  const handleApplyCoupon = () => {
    if (coupon.trim() === '') return;
    dispatch({ type: 'APPLY_COUPON', payload: coupon.trim() });
    setCoupon('');
  };

  const handleProceed = () => {
    if (!cart.items.length) {
      setAlertInfo({
        variant: 'warning',
        title: 'Cart is empty',
        message: 'Please add items to your cart before proceeding.',
      });
      return;
    }
    navigation.navigate('Booking', { cart });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Your selections from {cart.salonName || 'Beauty Hub'}</Text>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          cart.items.length === 0 && styles.emptyContainer
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>From ₹{item.price} + GST • {item.duration} mins</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemove(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {cart.items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Duration:</Text>
              <Text style={styles.summaryValue}>{totalDuration} mins</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Price:</Text>
              <Text style={styles.summaryPrice}>₹{totalPrice} + GST</Text>
            </View>
          </View>

          <View style={styles.couponContainer}>
            <TextInput
              placeholder="Enter coupon code"
              placeholderTextColor={colors.textSecondary}
              style={styles.couponInput}
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity 
              style={styles.couponApplyButton}
              onPress={handleApplyCoupon}
            >
              <Text style={styles.couponButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.clearButton]}
              onPress={handleClearCart}
            >
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.proceedButton]}
              onPress={handleProceed}
            >
              <Text style={styles.proceedButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {alertInfo && (
        <CustomAlert
          visible={!!alertInfo}
          onClose={() => setAlertInfo(null)}
          {...alertInfo}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    color: colors.error,
    fontWeight: '500',
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  summaryPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  couponContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  couponInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginRight: 12,
    color: colors.text,
  },
  couponApplyButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  couponButtonText: {
    color: colors.textOnPrimary,
    fontWeight: '600',
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '48%',
  },
  clearButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.error,
  },
  proceedButton: {
    backgroundColor: colors.primary,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textOnPrimary,
  },
});

export default CartScreen;