import type {
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export const pressableStyle =
  (base: StyleProp<ViewStyle>, pressed: StyleProp<ViewStyle>) =>
  (state: PressableStateCallbackType): StyleProp<ViewStyle> =>
    [base, state.pressed && pressed];
