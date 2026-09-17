import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';

export const useVisibilityAnimation = (isVisible: boolean): Animated.Value => {
  const progress = useRef(new Animated.Value(Number(isVisible))).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: Number(isVisible),
      duration: ANIMATION.BANNER_TRANSITION_MS,
      useNativeDriver: false,
    }).start();
  }, [isVisible, progress]);

  return progress;
};
