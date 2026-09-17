import { useMemo } from 'react';
import type { PokeballSizeStyles } from '@/presentation/components/Pokeball/Pokeball.types';
import { POKEBALL_PROPORTIONS } from '@/presentation/constants/layout.constants';

export const usePokeballStyles = (size: number): PokeballSizeStyles =>
  useMemo(() => {
    const borderWidth = size * POKEBALL_PROPORTIONS.BORDER;
    const bandHeight = size * POKEBALL_PROPORTIONS.BAND;
    const buttonSize = size * POKEBALL_PROPORTIONS.BUTTON;

    return {
      ball: { width: size, height: size, borderRadius: size / 2, borderWidth },
      band: { height: bandHeight, marginTop: -bandHeight / 2 },
      button: {
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        borderWidth,
      },
    };
  }, [size]);
