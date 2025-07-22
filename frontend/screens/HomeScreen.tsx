import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { cartItems, addItem, total, isLoading: cartLoading } = useCart();
  const { products, isLoading: productsLoading, error, refreshProducts } = useProducts();
  const { isAuthenticated, user } = useAuth();

  const handleAddToCart = async (product: any) => {
    await addItem({
      _id: product._id,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
        disabled={cartLoading}
      >
        <Text style={styles.addButtonText}>
          {cartLoading ? 'Adding...' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (productsLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={refreshProducts} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to TapEZ</Text>
      
      {/* Authentication Status */}
      {isAuthenticated ? (
        <Text style={styles.userGreeting}>Hello, {user?.name}!</Text>
      ) : (
        <Text style={styles.guestText}>Browse as guest or login for full experience</Text>
      )}

      {/* Cart Summary */}
      <Text style={styles.cartSummary}>
        Cart: {cartItems.length} items | Total: ₹{total.toFixed(2)}
      </Text>

      {/* Products List */}
      <Text style={styles.sectionTitle}>Available Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        style={styles.productsList}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title={`View Cart (${cartItems.length})`}
          onPress={() => navigation.navigate('Cart')}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Tap to Shop"
          onPress={() => navigation.navigate('Tap')}
        />
      </View>

      <View style={styles.nfcStatusBox}>
        <Text style={styles.nfcStatus}>NFC Reader: 🟢 Connected </Text>
      </View>
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
    padding: 20,
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    textAlign: 'center',
  },
  userGreeting: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  guestText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  cartSummary: { 
    fontSize: 16, 
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsList: {
    flex: 1,
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-around',
  },
  productCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    margin: 5,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonSpacer: {
    width: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  nfcStatusBox: { 
    marginTop: 10, 
    padding: 10, 
    backgroundColor: '#eee', 
    borderRadius: 10,
    alignItems: 'center',
  },
  nfcStatus: { 
    fontSize: 14,
  },
});
