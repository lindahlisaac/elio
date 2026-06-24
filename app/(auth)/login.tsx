import { Redirect } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components';
import { useAuth } from '@/features/profile';
import { isSupabaseConfigured, signInWithOAuth } from '@/services/supabase';

export default function LoginScreen() {
  const { session } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (session) {
    return <Redirect href="/(tabs)/explore" />;
  }

  const handleSignIn = async (provider: 'google' | 'apple') => {
    if (!isSupabaseConfigured) {
      setError('Add your Supabase credentials to .env first.');
      return;
    }

    setIsSigningIn(true);
    setError(null);

    try {
      await signInWithOAuth(provider);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Sign in failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>elio</Text>
        <Text style={styles.subtitle}>Track your trail coverage</Text>

        {!isSupabaseConfigured && (
          <Text style={styles.notice}>
            Copy .env.example to .env and add your Supabase project credentials.
          </Text>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={[styles.button, isSigningIn && styles.buttonDisabled]}
          onPress={() => handleSignIn('google')}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue with Google</Text>
          )}
        </Pressable>

        <Pressable
          style={[styles.buttonSecondary, isSigningIn && styles.buttonDisabled]}
          onPress={() => handleSignIn('apple')}
          disabled={isSigningIn}
        >
          <Text style={styles.buttonSecondaryText}>Continue with Apple</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  notice: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  error: {
    fontSize: 14,
    color: '#b00020',
  },
  button: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonSecondary: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
});
