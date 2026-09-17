import { useContext } from 'react';
import { NAVIGATION_ERRORS } from '@/presentation/constants/navigation.constants';
import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';
import { NavigationContext } from '@/presentation/navigation/NavigationContext';

export const useNavigation = (): NavigationContextValue => {
  const navigation = useContext(NavigationContext);

  if (!navigation) {
    throw new Error(NAVIGATION_ERRORS.MISSING_NAVIGATOR);
  }

  return navigation;
};
