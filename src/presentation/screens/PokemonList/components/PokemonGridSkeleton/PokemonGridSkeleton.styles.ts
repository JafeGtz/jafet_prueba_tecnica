import { StyleSheet } from 'react-native';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, spacing } from '@/presentation/theme';

export const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  cell: {
    padding: spacing.xs,
  },
  card: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  image: {
    width: LAYOUT.CARD_IMAGE_SIZE,
    height: LAYOUT.CARD_IMAGE_SIZE,
    borderRadius: radius.pill,
  },
  number: {
    width: '30%',
    height: 12,
  },
  name: {
    width: '60%',
    height: 18,
  },
});
