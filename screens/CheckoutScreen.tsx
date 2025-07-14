import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

// Define the navigation param list for your stack
type RootStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  Payment: { orderId: string };
  Tap: undefined;
  Success: { orderId: string };
};

export default function CheckoutScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePay = () => {
    const orderId = uuidv4();
    navigation.navigate('Payment', { orderId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Review & Pay</Text>
      <Button title="Lock Cart" onPress={() => {}} />
      <View style={{ height: 20 }} />
      <Button title="Pay Now" onPress={handlePay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 20, marginBottom: 20 },
});
