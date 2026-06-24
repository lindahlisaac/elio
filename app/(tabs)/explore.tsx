import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components';

export default function ExploreScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Explore an area</Text>
      <Text style={styles.body}>
        Pick a region like Flagstaff and see what percentage of trails you have covered.
        Map and coverage layers will live here.
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
