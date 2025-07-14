import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function SuccessScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Success'>>();
  const { orderId } = route.params;

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Payment Successful ✅</Text>
      <Text>Your Order ID: {orderId}</Text>
    </View>
  );
}
