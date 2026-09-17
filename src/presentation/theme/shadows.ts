import { Platform, type ViewStyle } from 'react-native';
import { colors } from '@/presentation/theme/colors';

export const shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    default: {
      elevation: 2,
    },
  }),
} as const;
