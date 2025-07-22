import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { v4 as uuidv4 } from 'uuid';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

const CheckoutScreen = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();

  const handlePay = () => {
  const orderId = uuidv4();
  console.log("Navigating to Payment with orderId:", orderId);
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
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
});
