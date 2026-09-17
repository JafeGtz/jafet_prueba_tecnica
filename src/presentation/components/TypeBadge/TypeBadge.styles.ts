import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  label: {
    ...typography.label,
  },
});
