import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/presentation/theme';

export const refreshColors = [colors.primary];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
