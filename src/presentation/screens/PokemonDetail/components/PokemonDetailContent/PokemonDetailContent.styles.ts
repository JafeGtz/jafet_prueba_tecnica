import { StyleSheet } from 'react-native';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: LAYOUT.CONTENT_MAX_WIDTH,
    alignSelf: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  measurements: {
    flexDirection: 'row',
  },
  abilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  totalLabel: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
});
