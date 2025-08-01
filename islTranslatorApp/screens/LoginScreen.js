import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { useAuth } from '../src/contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    setErrorMessage('');

    if (!email || !password || (isSignUp && !displayName)) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (isSignUp && password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      console.log(`Attempting to ${isSignUp ? 'sign up' : 'sign in'} with email:`, email);
      
      let result;
      if (isSignUp) {
        result = await signUp(email, password, displayName);
      } else {
        result = await signIn(email, password);
      }

      console.log('Auth result:', result);

      if (result.success) {
        console.log('Authentication successful');
      } else {
        console.log('Authentication failed:', result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error('Unexpected error during authentication:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.iconText}>🔒</Text>
            </View>
            <Text style={styles.title}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignUp 
                ? 'Join us to start translating sign language in real-time'
                : 'Sign in to continue your translation journey'
              }
            </Text>
          </View>

          <View style={styles.formSection}>
            {isSignUp && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Display Name"
                  value={displayName}
                  onChangeText={(text) => {
                    setDisplayName(text);
                    clearError();
                  }}
                  autoCapitalize="words"
                  placeholderTextColor="#9ca3af"
                  returnKeyType="next"
                />
              </View>
            )}
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  clearError();
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9ca3af"
                returnKeyType="next"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError();
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9ca3af"
                returnKeyType="done"
                onSubmitEditing={handleAuth}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={togglePasswordVisibility}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6d28d9" />
                <Text style={styles.loaderText}>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </Text>
              </View>
            ) : (
              <Button 
                title={isSignUp ? 'Create Account' : 'Sign In'} 
                onPress={handleAuth}
                disabled={!email || !password || (isSignUp && !displayName)}
                color="#6d28d9"
              />
            )}
          </View>

          <View style={styles.footerSection}>
            <Button 
              title={isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'} 
              onPress={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage('');
              }}
              color="#6b7280"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  headerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  illustrationCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 48,
    color: '#a21caf',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b0764',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f9fafb',
    fontSize: 16,
    color: '#1f2937',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeIconText: {
    fontSize: 20,
    color: '#6b7280',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  footerSection: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingTop: 20,
  },
});
