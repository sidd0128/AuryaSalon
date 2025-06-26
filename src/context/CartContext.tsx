import React, { createContext, useContext, useReducer } from 'react';
import { Cart, CartItem } from '../navigation/types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { salonId: string; salonName: string; item: CartItem } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: string };

const CartContext = createContext<any>(null);

const initialState: Cart = {
  salonId: '',
  salonName: '',
  items: [],
  couponCode: '',
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.salonId && state.salonId !== action.payload.salonId) {
        return {
          salonId: action.payload.salonId,
          salonName: action.payload.salonName,
          items: [action.payload.item],
        };
      }
      return {
        ...state,
        salonId: action.payload.salonId,
        salonName: action.payload.salonName,
        items: [...state.items, action.payload.item],
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'CLEAR_CART':
      return initialState;
    case 'APPLY_COUPON':
      return { ...state, couponCode: action.payload };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
