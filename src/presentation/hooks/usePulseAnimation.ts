import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';

const pulseStep = (value: Animated.Value, toValue: number) =>
  Animated.timing(value, {
    toValue,
    duration: ANIMATION.SKELETON_PULSE_MS,
    useNativeDriver: true,
  });

export const usePulseAnimation = (): Animated.Value => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        pulseStep(opacity, ANIMATION.SKELETON_MIN_OPACITY),
        pulseStep(opacity, 1),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return opacity;
};
