import { StyleSheet } from 'react-native';
import { POKEBALL_PROPORTIONS } from '@/presentation/constants/layout.constants';

export const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: POKEBALL_PROPORTIONS.WATERMARK_OPACITY,
  },
});
