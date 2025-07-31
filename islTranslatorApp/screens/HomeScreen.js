import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationBox}>
        {/* Placeholder for illustration/icon */}
        <View style={styles.illustrationCircle}>
          <Text style={{ fontSize: 48, color: '#a21caf' }}>🎤</Text>
        </View>
        <Text style={styles.illustrationArrow}>→</Text>
        <View style={styles.illustrationCircle}>
          <Text style={{ fontSize: 48, color: '#fde047' }}>🤟</Text>
        </View>
      </View>
      <Text style={styles.title}>Real-Time Sign Language Translator</Text>
      <Text style={styles.subtitle}>
        A simple, intuitive way to understand and be understood — through signs and speech.
      </Text>
      <Text style={styles.translateTo}>Translate to:</Text>
      <View style={styles.buttonRow}>
        <Button title="Sign Language" color="#6d28d9" onPress={() => navigation.navigate('LiveScreen')} />
        <View style={{ width: 16 }} />
        <Button title="Spoken Language" color="#6d28d9" onPress={() => navigation.navigate('SpokenLanguage')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustrationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  illustrationCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationArrow: {
    fontSize: 32,
    color: '#a21caf',
    marginHorizontal: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3b0764',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
  },
  translateTo: {
    fontSize: 16,
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
