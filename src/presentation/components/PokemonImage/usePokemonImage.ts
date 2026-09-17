import { useMemo } from 'react';
import { POKEBALL_PROPORTIONS } from '@/presentation/constants/layout.constants';

export const usePokemonImage = (uri: string, size: number) =>
  useMemo(
    () => ({
      source: { uri },
      frameStyle: { width: size, height: size },
      watermarkSize: size * POKEBALL_PROPORTIONS.WATERMARK_SCALE,
    }),
    [uri, size],
  );
