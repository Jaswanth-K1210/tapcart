import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

type CartItem = {
  id: string;
  name: string;
  price: number;
};

export default function CartScreen() {
  const { cartItems } = useCart();
  const navigation = useNavigation<any>();
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>₹{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
      />
      <Text style={styles.total}>Total: ₹{total}</Text>
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, marginBottom: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  total: { marginTop: 20, fontWeight: 'bold', fontSize: 16 },
});
