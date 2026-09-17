import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';

export const useProgressAnimation = (ratio: number) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: ratio,
      duration: ANIMATION.STAT_BAR_FILL_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, ratio]);

  return useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
    [progress],
  );
};
