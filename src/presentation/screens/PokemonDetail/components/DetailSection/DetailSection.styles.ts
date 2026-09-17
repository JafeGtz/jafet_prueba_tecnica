import { StyleSheet } from 'react-native';
import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '@/presentation/theme';

export const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
});
