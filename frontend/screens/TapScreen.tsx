import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from '../contexts/CartContext';

export default function TapScreen() {
  const { addItem } = useCart();
  const [tapSuccess, setTapSuccess] = useState<boolean | null>(null);

  const handleSimulateTap = () => {
    const success = true; // simulate a successful NFC tap
    setTapSuccess(success);

    if (success) {
      addItem({ id: '1', name: 'Bluff Cola 500ml', price: 45 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hold Your Product to the NFC Reader</Text>
      <Button title="Simulate Tap" onPress={handleSimulateTap} />

      {tapSuccess !== null && (
        <View style={styles.feedback}>
          <Text style={{ fontSize: 18, color: tapSuccess ? 'green' : 'red' }}>
            {tapSuccess ? '✅ Tap Success' : '❌ Tap Failed'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  heading: { fontSize: 18, marginBottom: 20 },
  feedback: { marginTop: 30 },
});
