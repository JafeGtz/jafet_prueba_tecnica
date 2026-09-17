import { StyleSheet } from 'react-native';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, shadows, spacing } from '@/presentation/theme';

export const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  imageArea: {
    width: LAYOUT.HERO_BACKDROP_SIZE,
    height: LAYOUT.HERO_BACKDROP_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.pill,
    opacity: 0.2,
  },
  types: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
