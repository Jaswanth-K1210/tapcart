import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

type CartItem = {
  _id: string;
  productId?: string;
  name: string;
  price: number;
  quantity?: number;
};

export default function CartScreen() {
  const { cartItems, clearCart, updateQuantity, removeItem, total, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<any>();

  const handleQuantityChange = async (item: CartItem, change: number) => {
    const newQuantity = (item.quantity || 1) + change;
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', onPress: () => removeItem(item._id) }
        ]
      );
    } else {
      await updateQuantity(item._id, newQuantity);
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price} each</Text>
        <Text style={styles.itemTotal}>
          Subtotal: ₹{(item.price * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item, -1)}
          disabled={isLoading}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity || 1}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item, 1)}
          disabled={isLoading}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Updating cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>
      
      {!isAuthenticated && (
        <View style={styles.authWarning}>
          <Text style={styles.authWarningText}>
            ⚠️ You're browsing as guest. Login to sync cart across devices.
          </Text>
        </View>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item._id + index}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
            <Button 
              title="Continue Shopping" 
              onPress={() => navigation.navigate('Home')} 
            />
          </View>
        }
        style={styles.cartList}
      />
      
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Items: {cartItems.length}</Text>
            <Text style={styles.totalAmount}>Total: ₹{total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <Button 
              title="Clear Cart" 
              onPress={handleClearCart}
              color="#FF3B30"
            />
            <View style={styles.buttonSpacer} />
            <Button 
              title="Proceed to Checkout" 
              onPress={() => navigation.navigate('Checkout')} 
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: { 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  authWarning: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  authWarningText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
  cartList: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f8f8',
    marginBottom: 5,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  quantityButton: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  totalContainer: {
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacer: {
    width: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
