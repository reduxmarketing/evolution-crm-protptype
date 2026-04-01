import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (code.trim().toLowerCase() === 'root') {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#0a0e1a', '#111832', '#0a0e1a']} style={styles.loginBg}>
        <View style={styles.loginContent}>
          {/* Logo */}
          <View style={styles.logoWrap}>
            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoCircle}>
              <MaterialIcons name="shield" size={36} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.loginTitle}>Evolution CRM</Text>
          <Text style={styles.loginSubtitle}>Enter access code to continue</Text>

          {/* Input */}
          <View style={styles.inputWrap}>
            <TextInput
              style={[styles.loginInput, error && styles.loginInputError]}
              placeholder="Access code"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={code}
              onChangeText={(t) => { setCode(t); setError(false); }}
              onSubmitEditing={handleLogin}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            {error && (
              <Text style={styles.errorText}>Invalid access code</Text>
            )}
          </View>

          {/* Button */}
          <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Unlock</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.loginFooter}>Evolution Restoration - Phoenix, AZ</Text>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export default function RootLayout() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onLogin={() => setAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.surface} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1 },
  loginBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginContent: { width: '100%', maxWidth: 360, paddingHorizontal: 32, alignItems: 'center' },
  logoWrap: { marginBottom: 24 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  loginSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 32,
  },
  inputWrap: { width: '100%', marginBottom: 20 },
  loginInput: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#fff',
  },
  loginInputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 4,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginFooter: {
    marginTop: 48,
    fontSize: 12,
    color: 'rgba(255,255,255,0.25)',
    letterSpacing: 0.5,
  },
});
