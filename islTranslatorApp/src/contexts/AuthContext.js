import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Helper function to get user-friendly error messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address. Please check your email or create a new account.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('Attempting to sign in with:', email);
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log('Sign in successful for:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error.code, error.message);
      const userFriendlyMessage = getErrorMessage(error.code);
      return { success: false, error: userFriendlyMessage, errorCode: error.code };
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      console.log('Attempting to sign up with:', email);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: displayName
      });
      console.log('Sign up successful for:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign up error:', error.code, error.message);
      const userFriendlyMessage = getErrorMessage(error.code);
      return { success: false, error: userFriendlyMessage, errorCode: error.code };
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      console.log('Sign out successful');
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const getAuthToken = async () => {
    try {
      const token = await auth().currentUser?.getIdToken();
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 