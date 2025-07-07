import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { preloadStaticData } from './utils/preloadData';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchSalonsScreen from './screens/SearchSalonsScreen';
import SalonInfoScreen from './screens/SalonInfoScreen';
import TreatmentsScreen from './screens/TreatmentsScreen';
import CartScreen from './screens/CartScreen';
import BookingScreen from './screens/BookingScreen';
import MyAppointmentsScreen from './screens/MyAppointmentsScreen';
import ChangeLocationScreen from './screens/ChangeLocationScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import ChatScreen from './screens/ChatScreen';

import { RootStackParamList } from './navigation/types';

import 'react-native-get-random-values';
import CustomerReviewScreen from './screens/CustomerReviewScreen';
import RateSalonScreen from './screens/RateSalonScreen';
import SpecialistProfileScreen from './screens/SpecialistProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screens: {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}[] = [
  { name: 'Splash', component: SplashScreen, options: { headerShown: false } },
  { name: 'Register', component: RegisterScreen, options: { headerShown: false } },
  { name: 'SearchSalons', component: SearchSalonsScreen, options: { headerShown: false } },
  { name: 'SalonInfo', component: SalonInfoScreen, options: { headerShown: false } },
  { name: 'Chat', component: ChatScreen, options: { headerShown: true, title: 'Chat with Salon' } },
  { name: 'Treatments', component: TreatmentsScreen, options: { headerShown: false } },
  { name: 'Cart', component: CartScreen, options: { title: 'Your Cart' } },
  { name: 'Booking', component: BookingScreen },
  { name: 'MyAppointments', component: MyAppointmentsScreen },
  { name: 'CustomerReview', component: CustomerReviewScreen, options: { title: 'Customer Reviews' } },
  { name: 'ChangeLocation', component: ChangeLocationScreen, options: { headerShown: false } },
  { name: 'MyAccount', component: MyAccountScreen, options: { headerShown: false } },
  {name: 'RateSalon', component: RateSalonScreen, options: { headerShown: false }},
  {name: 'SpecialistProfileScreen', component: SpecialistProfileScreen, options: { headerShown: false }}

];

const App: React.FC = () => {
  useEffect(() => {
    preloadStaticData();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            {screens.map(({ name, component, options }) => (
              <Stack.Screen
                key={name}
                name={name}
                component={component}
                options={options}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
