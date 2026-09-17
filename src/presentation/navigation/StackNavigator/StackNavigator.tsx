import React from 'react';
import { View } from 'react-native';
import { NavigationContext } from '@/presentation/navigation/NavigationContext';
import { styles } from '@/presentation/navigation/StackNavigator/StackNavigator.styles';
import type { StackNavigatorProps } from '@/presentation/navigation/StackNavigator/StackNavigator.types';
import { StackScreen } from '@/presentation/navigation/StackScreen/StackScreen';
import { useStackNavigator } from '@/presentation/navigation/useStackNavigator';

export const StackNavigator = ({
  initialRoute,
  screens,
}: StackNavigatorProps) => {
  const {
    navigation,
    screens: stackScreens,
    removeEntry,
  } = useStackNavigator(initialRoute);

  return (
    <NavigationContext.Provider value={navigation}>
      <View style={styles.container}>
        {stackScreens.map(screen => (
          <StackScreen
            key={screen.entry.key}
            {...screen}
            component={screens[screen.entry.route]}
            onClosed={removeEntry}
          />
        ))}
      </View>
    </NavigationContext.Provider>
  );
};
