import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components';
import { useAuth } from '@/features/profile';

export default function ProfileScreen() {
  const { session, signOut } = useAuth();

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.email}>{session?.user.email ?? 'Signed in'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connections</Text>
        <Text style={styles.body}>Strava connection will be managed here.</Text>
      </View>

      <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  section: {
    gap: 4,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  button: {
    marginTop: 'auto',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});
