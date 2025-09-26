import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import LoginScreen from '../screens/LoginScreen';
import SimpleNavigator from './SimpleNavigator';
import { AuthState } from '../types';

const AuthNavigator: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('Login');

  const handleLoginSuccess = () => {
    setAuthState('Authenticated');
  };

  const handleLogout = () => {
    setAuthState('Login');
  };

  return (
    <View style={styles.container}>
      {authState === 'Login' ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SimpleNavigator onLogout={handleLogout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default AuthNavigator;
