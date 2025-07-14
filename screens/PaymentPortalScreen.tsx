import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import { StackNavigationProp } from '@react-navigation/stack';

export default function PaymentPortalScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Payment'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Payment'>>();
  const { orderId } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Success', { orderId });
    }, 2000); // simulate 2s payment processing

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Processing Payment...</Text>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}
