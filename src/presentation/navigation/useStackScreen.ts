import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, useWindowDimensions } from 'react-native';
import { ANIMATION } from '@/presentation/constants/animation.constants';
import { SCREEN_ACCESSIBILITY } from '@/presentation/constants/navigation.constants';
import type { StackScreenProps } from '@/presentation/navigation/StackScreen/StackScreen.types';

type StackScreenOptions = Omit<StackScreenProps, 'component'>;

export const useStackScreen = ({
  entry,
  isFocused,
  isRoot,
  onClosed,
}: StackScreenOptions) => {
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(Number(isRoot))).current;
  const { key, isClosing } = entry;

  useEffect(() => {
    const transition = Animated.timing(progress, {
      toValue: Number(!isClosing),
      duration: ANIMATION.SCREEN_TRANSITION_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    transition.start(({ finished }) => {
      if (finished && isClosing) {
        onClosed(key);
      }
    });

    return () => transition.stop();
  }, [isClosing, key, onClosed, progress]);

  const animatedStyle = useMemo(
    () => ({
      transform: [
        {
          translateX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
          }),
        },
      ],
    }),
    [progress, width],
  );

  const accessibility = isFocused
    ? SCREEN_ACCESSIBILITY.FOCUSED
    : SCREEN_ACCESSIBILITY.BACKGROUND;

  return { animatedStyle, accessibility };
};
