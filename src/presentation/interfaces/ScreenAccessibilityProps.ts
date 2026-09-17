import type { ViewProps } from 'react-native';

export interface ScreenAccessibilityProps {
  pointerEvents: ViewProps['pointerEvents'];
  importantForAccessibility: ViewProps['importantForAccessibility'];
  accessibilityElementsHidden: boolean;
}
