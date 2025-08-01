import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const result = await signOut();
            if (!result.success) {
              Alert.alert('Error', result.error);
            }
          }
        }
      ]
    );
  };

  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    } else if (user?.email) {
      const username = user.email.split('@')[0];
      return username;
    } else {
      return 'User';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>
          Welcome, {getDisplayName()}!
        </Text>
        <Button title="Sign Out" onPress={handleSignOut} color="#ef4444" />
      </View>

      <View style={styles.illustrationBox}>
        <View style={styles.illustrationCircle}>
          <Text style={styles.iconText}>🎤</Text>
        </View>
        <Text style={styles.illustrationArrow}>→</Text>
        <View style={styles.illustrationCircle}>
          <Text style={styles.iconText}>🤟</Text>
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
  userInfo: {
    position: 'absolute',
    top: 50,
    right: 20,
    alignItems: 'flex-end',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
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
  iconText: {
    fontSize: 48,
    color: '#a21caf',
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
