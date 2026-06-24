import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type MapFrameProps = {
  children?: ReactNode;
  style?: ViewStyle;
};

export function MapFrame({ children, style }: MapFrameProps) {
  return (
    <View style={[styles.frame, style]}>
      {children ?? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Map</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#f7f7f7',
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#999',
    letterSpacing: 0.5,
  },
});
