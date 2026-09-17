import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { BackHandler } from 'react-native';
import { NavigationActionType } from '@/presentation/enums/NavigationActionType';
import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';
import type { StackNavigatorState } from '@/presentation/interfaces/StackNavigatorState';
import { createStackEntry } from '@/presentation/navigation/createStackEntry';
import {
  getOpenEntries,
  navigationReducer,
} from '@/presentation/navigation/navigationReducer';
import type {
  ParamlessRoute,
  StackEntry,
} from '@/presentation/types/navigation.types';

const createInitialStack = (route: ParamlessRoute): StackEntry[] => [
  createStackEntry(route, undefined),
];

export const useStackNavigator = (
  initialRoute: ParamlessRoute,
): StackNavigatorState => {
  const [stack, dispatch] = useReducer(
    navigationReducer,
    initialRoute,
    createInitialStack,
  );

  const openEntries = getOpenEntries(stack);
  const canGoBack = openEntries.length > 1;
  const focusedKey = openEntries[openEntries.length - 1]?.key;

  const navigate = useCallback<NavigationContextValue['navigate']>(
    (route, params) =>
      dispatch({
        type: NavigationActionType.Push,
        entry: createStackEntry(route, params),
      }),
    [],
  );

  const goBack = useCallback(
    () => dispatch({ type: NavigationActionType.Close }),
    [],
  );

  const removeEntry = useCallback(
    (key: string) => dispatch({ type: NavigationActionType.Remove, key }),
    [],
  );

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack();
        return canGoBack;
      },
    );
    return () => subscription.remove();
  }, [canGoBack, goBack]);

  const navigation = useMemo(
    () => ({ canGoBack, navigate, goBack }),
    [canGoBack, navigate, goBack],
  );

  const screens = stack.map((entry, index) => ({
    entry,
    isFocused: entry.key === focusedKey,
    isRoot: index === 0,
  }));

  return { navigation, screens, removeEntry };
};
