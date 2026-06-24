import { Redirect } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Screen } from '@/components';
import { useAuth } from '@/features/profile';
import {
  isSupabaseConfigured,
  signInWithEmail,
  signInWithOAuth,
  signUpWithEmail,
} from '@/services/supabase';

type AuthMode = 'sign-in' | 'sign-up';

export default function LoginScreen() {
  const { session } = useAuth();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (session) {
    return <Redirect href="/(tabs)/explore" />;
  }

  const resetFeedback = () => {
    setError(null);
    setMessage(null);
  };

  const handleEmailAuth = async () => {
    if (!isSupabaseConfigured) {
      setError('Add your Supabase credentials to .env first.');
      return;
    }

    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    resetFeedback();

    try {
      if (mode === 'sign-in') {
        await signInWithEmail(email, password);
      } else {
        const { needsEmailConfirmation } = await signUpWithEmail(email, password);

        if (needsEmailConfirmation) {
          setMessage('Check your email to confirm your account, then sign in.');
          setMode('sign-in');
          setPassword('');
        }
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    if (!isSupabaseConfigured) {
      setError('Add your Supabase credentials to .env first.');
      return;
    }

    setIsSubmitting(true);
    resetFeedback();

    try {
      await signInWithOAuth(provider);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Sign in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetFeedback();
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>elio</Text>
            <Text style={styles.subtitle}>Track your trail coverage</Text>

            {!isSupabaseConfigured && (
              <Text style={styles.notice}>
                Copy .env.example to .env and add your Supabase project credentials.
              </Text>
            )}

            {error && <Text style={styles.error}>{error}</Text>}
            {message && <Text style={styles.message}>{message}</Text>}

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                editable={!isSubmitting}
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                autoComplete={mode === 'sign-in' ? 'password' : 'new-password'}
                textContentType={mode === 'sign-in' ? 'password' : 'newPassword'}
                editable={!isSubmitting}
              />
            </View>

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={handleEmailAuth}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {mode === 'sign-in' ? 'Sign in' : 'Create account'}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => switchMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
              disabled={isSubmitting}
            >
              <Text style={styles.switchMode}>
                {mode === 'sign-in'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              style={[styles.buttonSecondary, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleOAuthSignIn('google')}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonSecondaryText}>Continue with Google</Text>
            </Pressable>

            <Pressable
              style={[styles.buttonSecondary, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleOAuthSignIn('apple')}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonSecondaryText}>Continue with Apple</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
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
  message: {
    fontSize: 14,
    color: '#1b5e20',
    lineHeight: 20,
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111',
    backgroundColor: '#fff',
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
  switchMode: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    fontSize: 14,
    color: '#888',
  },
});
