import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/presentation/theme';

export const styles = StyleSheet.create({
  banner: {
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.offline,
  },
  message: {
    ...typography.caption,
    color: colors.onOffline,
    textAlign: 'center',
  },
});
