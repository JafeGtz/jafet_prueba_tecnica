import { StyleSheet } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, shadows } from '@/presentation/theme';

export const styles = StyleSheet.create({
  button: {
    width: LAYOUT.MIN_TOUCH_TARGET,
    height: LAYOUT.MIN_TOUCH_TARGET,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  pressed: {
    opacity: ANIMATION.PRESSED_OPACITY,
  },
  chevron: {
    width: 12,
    height: 12,
    marginLeft: 4,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.textPrimary,
    transform: [{ rotate: '45deg' }],
  },
});
