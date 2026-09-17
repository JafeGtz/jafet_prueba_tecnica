import { useMemo } from 'react';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { useIsOnline } from '@/presentation/hooks/useIsOnline';
import { useVisibilityAnimation } from '@/presentation/hooks/useVisibilityAnimation';

export const useOfflineBanner = () => {
  const isVisible = !useIsOnline();
  const progress = useVisibilityAnimation(isVisible);

  const animatedStyle = useMemo(
    () => ({
      opacity: progress,
      height: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, LAYOUT.OFFLINE_BANNER_HEIGHT],
      }),
    }),
    [progress],
  );

  return { animatedStyle, isVisible, message: STRINGS.offlineBanner };
};
