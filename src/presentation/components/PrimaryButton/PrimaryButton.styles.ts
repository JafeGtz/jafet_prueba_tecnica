import { StyleSheet } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  button: {
    minHeight: LAYOUT.MIN_TOUCH_TARGET,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: ANIMATION.PRESSED_OPACITY,
  },
  label: {
    ...typography.subtitle,
    color: colors.onPrimary,
  },
});
