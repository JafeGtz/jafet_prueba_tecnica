import React from 'react';
import { Animated } from 'react-native';
import { RouteContext } from '@/presentation/navigation/RouteContext';
import { styles } from '@/presentation/navigation/StackScreen/StackScreen.styles';
import type { StackScreenProps } from '@/presentation/navigation/StackScreen/StackScreen.types';
import { useStackScreen } from '@/presentation/navigation/useStackScreen';

export const StackScreen = ({
  component: Screen,
  ...state
}: StackScreenProps) => {
  const { animatedStyle, accessibility } = useStackScreen(state);

  return (
    <RouteContext.Provider value={state.entry}>
      <Animated.View style={[styles.screen, animatedStyle]} {...accessibility}>
        <Screen />
      </Animated.View>
    </RouteContext.Provider>
  );
};
