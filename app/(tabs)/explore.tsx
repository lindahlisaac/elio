import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components';
import { MapFrame } from '@/features/maps';

export default function ExploreScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Explore an area</Text>
        <Text style={styles.body}>
          Pick a region and see what percentage of trails you have covered.
        </Text>
      </View>

      <MapFrame style={styles.map} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  header: {
    gap: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  map: {
    minHeight: 320,
  },
});
