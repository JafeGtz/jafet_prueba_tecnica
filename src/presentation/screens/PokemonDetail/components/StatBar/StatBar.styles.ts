import { StyleSheet } from 'react-native';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { colors, radius, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    ...typography.label,
    width: LAYOUT.STAT_LABEL_WIDTH,
    color: colors.textSecondary,
  },
  value: {
    ...typography.label,
    width: LAYOUT.STAT_VALUE_WIDTH,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  track: {
    flex: 1,
    height: LAYOUT.STAT_BAR_HEIGHT,
    overflow: 'hidden',
    borderRadius: radius.pill,
    backgroundColor: colors.track,
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
