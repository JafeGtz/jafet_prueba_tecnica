import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';
import { AbilityVariant } from '@/presentation/enums/AbilityVariant';
import { colors, radius, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  regularChip: {
    backgroundColor: colors.track,
    borderColor: colors.track,
  },
  hiddenChip: {
    backgroundColor: colors.surface,
    borderColor: colors.textSecondary,
    borderStyle: 'dashed',
  },
  label: {
    ...typography.label,
  },
  regularLabel: {
    color: colors.textPrimary,
  },
  hiddenLabel: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export const chipVariantStyles: Record<AbilityVariant, ViewStyle> = {
  [AbilityVariant.Regular]: styles.regularChip,
  [AbilityVariant.Hidden]: styles.hiddenChip,
};

export const labelVariantStyles: Record<AbilityVariant, TextStyle> = {
  [AbilityVariant.Regular]: styles.regularLabel,
  [AbilityVariant.Hidden]: styles.hiddenLabel,
};
