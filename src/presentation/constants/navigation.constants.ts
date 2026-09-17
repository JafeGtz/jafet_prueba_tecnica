import type { Route } from '@/presentation/enums/Route';
import type { ScreenAccessibilityProps } from '@/presentation/interfaces/ScreenAccessibilityProps';

export const NAVIGATION_ERRORS = {
  MISSING_NAVIGATOR: 'useNavigation must be used inside a StackNavigator',
  ROUTE_MISMATCH: (route: Route) =>
    `useRouteParams(${route}) was called outside of its screen`,
} as const;

export const SCREEN_ACCESSIBILITY = {
  FOCUSED: {
    pointerEvents: 'auto',
    importantForAccessibility: 'auto',
    accessibilityElementsHidden: false,
  },
  BACKGROUND: {
    pointerEvents: 'none',
    importantForAccessibility: 'no-hide-descendants',
    accessibilityElementsHidden: true,
  },
} as const satisfies Record<string, ScreenAccessibilityProps>;
