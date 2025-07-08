import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';


import { styles } from './styles';
import { AlertInfo, CartScreenProps } from './types';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../navigation/types';
import CustomAlert from '../../components/CustomAlert';

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cart, dispatch } = useCart();
  const [coupon, setCoupon] = useState('');
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  const totalPrice = useMemo(
    () => cart.items.reduce((sum: number, i: CartItem) => sum + i.price, 0),
    [cart]
  );

  const totalDuration = useMemo(
    () => cart.items.reduce((sum: number, i: CartItem) => sum + i.duration, 0),
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
      onConfirm: () => {
        dispatch({ type: 'CLEAR_CART' });
        setAlertInfo(null);
      },
      onCancel: () => setAlertInfo(null),
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
        <Text style={styles.subtitle}>
          Your selections from {cart.salonName || 'Beauty Hub'}
        </Text>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          cart.items.length === 0 && styles.emptyContainer,
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                From ₹{item.price} + GST • {item.duration} mins
              </Text>
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
              placeholderTextColor="#999"
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

export default CartScreen;
