import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

// Define your stack param list
type RootStackParamList = {
  Payment: { orderId: string };
  Success: { orderId: string };
  // add other screens here if needed
};

export default function PaymentPortalScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Success', { orderId });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Processing Payment...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 10 },
});
