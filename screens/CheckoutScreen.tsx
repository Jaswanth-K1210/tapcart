import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const CheckoutScreen = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigation = useNavigation<any>();

 const handleCheckout = () => {
  const orderId = uuidv4();
  navigation.navigate('Payment', { orderId });
};


  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Checkout</Text>
      <Text>Total: ₹{total}</Text>
      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutScreen;
