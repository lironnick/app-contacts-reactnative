import { theme } from '@/theme';
import { ActivityIndicator, StyleSheet } from 'react-native';

export function Loading() {
  return <ActivityIndicator style={styles.loading} color={theme.colors.blue} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
