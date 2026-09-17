import { StyleSheet } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';
import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '@/presentation/theme';

export const styles = StyleSheet.create({
  cell: {
    padding: spacing.xs,
  },
  card: {
    alignItems: 'center',
    gap: spacing.xxs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  pressed: {
    opacity: ANIMATION.PRESSED_OPACITY,
    transform: [{ scale: ANIMATION.PRESSED_SCALE }],
  },
  number: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
});
