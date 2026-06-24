import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components';

export default function ActivitiesScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Your activities</Text>
      <Text style={styles.body}>
        Strava sync and GPX imports will show up here once connected.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
