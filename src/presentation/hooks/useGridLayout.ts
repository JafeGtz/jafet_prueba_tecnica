import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { clamp } from '@/core/utils/clamp';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import type { GridLayout } from '@/presentation/interfaces/GridLayout';

export const useGridLayout = (): GridLayout => {
  const { width } = useWindowDimensions();
  const columns = clamp(
    Math.floor(width / LAYOUT.GRID_MIN_CARD_WIDTH),
    LAYOUT.GRID_MIN_COLUMNS,
    LAYOUT.GRID_MAX_COLUMNS,
  );

  return useMemo(
    () => ({ columns, itemWidth: `${100 / columns}%` }),
    [columns],
  );
};
