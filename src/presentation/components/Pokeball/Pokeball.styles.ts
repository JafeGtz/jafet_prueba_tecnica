import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/theme';

export const styles = StyleSheet.create({
  ball: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderColor: colors.pokeballBand,
  },
  upperHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: colors.primary,
  },
  band: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    backgroundColor: colors.pokeballBand,
  },
  button: {
    backgroundColor: colors.surface,
    borderColor: colors.pokeballBand,
  },
});
