import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SpokenLanguageScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Here you would call your backend to get gesture sequence for the input
  };

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Spoken Language to Sign</Text>
      <Text style={styles.subtitle}>Type a sentence to see it in sign language gestures.</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Show Gestures" onPress={handleSubmit} color="#6d28d9" />
      {submitted && (
        <View style={styles.gestureBox}>
          <Text style={styles.gestureText}>
            {/* Placeholder for gesture skeleton animation */}
            (Gesture animation for: "{input}")
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b0764',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a21caf',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f3e8ff',
  },
  gestureBox: {
    marginTop: 24,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  gestureText: {
    fontSize: 16,
    color: '#222',
  },
});
