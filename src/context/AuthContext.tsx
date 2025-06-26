import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  user: null,
  salons: [],
  bookings: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_SALONS':
      return { ...state, salons: action.payload };
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload };
    default:
      return state;
  }
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);