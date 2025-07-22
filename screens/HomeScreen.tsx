import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// If the hook is named differently, update the import accordingly.
// For example, if it's exported as CartContext, use:
// import { CartContext } from '../contexts/CartContext';
// Or, if it's a default export:
// import useCart from '../contexts/CartContext';
import { useCart } from '../contexts/CartContext';

export default function HomeScreen() {
  // If you have a defined navigation type, use it here:
  // import { HomeScreenNavigationProp } from '../types/navigation';
  // const navigation = useNavigation<HomeScreenNavigationProp>();

  // Otherwise, use 'any' as a quick fix:
  const navigation = useNavigation<any>();
  const { cartItems } = useCart();

  type CartItem = {
    price: number;
    // Add other properties if needed, e.g. id, name, etc.
  };

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to TapEZ</Text>
      <Text style={styles.cartSummary}>
        Items in Cart: {cartItems.length} | Total: ₹{total}
      </Text>

      <Button title="Start Tapping" onPress={() => navigation.navigate('Tap')} />
      <View style={{ height: 10 }} />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />

      <View style={styles.nfcStatusBox}>
        <Text style={styles.nfcStatus}>NFC Reader:🟢 Connected </Text>
        {/* Replace with 🟢 Connected once hardware integrated */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  cartSummary: { fontSize: 16, marginBottom: 20 },
  nfcStatusBox: { marginTop: 40, padding: 10, backgroundColor: '#eee', borderRadius: 10 },
  nfcStatus: { fontSize: 14 },
});
