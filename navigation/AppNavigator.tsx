import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TapScreen from '../screens/TapScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentPortalScreen from '../screens/PaymentPortalScreen';
import SuccessScreen from '../screens/SuccessScreen';

export type RootStackParamList = {
  Home: undefined;
  Tap: undefined;
  Cart: undefined;
  Checkout: undefined;
  Payment: { orderId: string };
  Success: { orderId: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Tap" component={TapScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Payment" component={PaymentPortalScreen} />

    <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
