import { NavigationActionType } from '@/presentation/enums/NavigationActionType';
import type {
  NavigationAction,
  StackEntry,
} from '@/presentation/types/navigation.types';

export const getOpenEntries = (stack: StackEntry[]): StackEntry[] =>
  stack.filter(entry => !entry.isClosing);

const closeTopEntry = (stack: StackEntry[]): StackEntry[] => {
  const openEntries = getOpenEntries(stack);

  if (openEntries.length <= 1) {
    return stack;
  }

  const topKey = openEntries[openEntries.length - 1].key;
  return stack.map(entry =>
    entry.key === topKey ? { ...entry, isClosing: true } : entry,
  );
};

export const navigationReducer = (
  stack: StackEntry[],
  action: NavigationAction,
): StackEntry[] => {
  switch (action.type) {
    case NavigationActionType.Push:
      return [...stack, action.entry];
    case NavigationActionType.Close:
      return closeTopEntry(stack);
    case NavigationActionType.Remove:
      return stack.filter(entry => entry.key !== action.key);
  }
};
