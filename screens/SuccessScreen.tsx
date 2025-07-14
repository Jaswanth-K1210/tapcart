import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function SuccessScreen() {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>✅ Payment Successful</Text>
      <Text>Your Order ID:</Text>
      <Text style={styles.orderId}>{orderId}</Text>
      <Text style={{ marginTop: 20 }}>Collect your items at the counter.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  orderId: { fontWeight: 'bold', marginTop: 10 },
});
