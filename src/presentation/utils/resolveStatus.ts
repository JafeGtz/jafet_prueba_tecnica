import type { StatusRule } from '@/presentation/interfaces/StatusRule';

export const resolveStatus = <TSnapshot, TStatus>(
  rules: ReadonlyArray<StatusRule<TSnapshot, TStatus>>,
  snapshot: TSnapshot,
  fallback: TStatus,
): TStatus => rules.find(rule => rule.when(snapshot))?.status ?? fallback;
