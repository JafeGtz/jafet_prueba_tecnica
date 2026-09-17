import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xxs,
  },
  value: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
