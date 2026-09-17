import { StyleSheet } from 'react-native';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, spacing } from '@/presentation/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: LAYOUT.CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  image: {
    width: LAYOUT.HERO_BACKDROP_SIZE,
    height: LAYOUT.HERO_BACKDROP_SIZE,
    borderRadius: radius.pill,
  },
  badge: {
    width: 140,
    height: 26,
    borderRadius: radius.pill,
  },
  section: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  title: {
    width: '45%',
    height: 22,
  },
  line: {
    width: '100%',
    height: LAYOUT.STAT_BAR_HEIGHT * 2,
  },
});
