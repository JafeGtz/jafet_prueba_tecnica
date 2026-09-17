import { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import type { ScreenStatusSnapshot } from '@/presentation/interfaces/ScreenStatusSnapshot';
import type { StatusRule } from '@/presentation/interfaces/StatusRule';
import { resolveStatus } from '@/presentation/utils/resolveStatus';

const SCREEN_STATUS_RULES: ReadonlyArray<
  StatusRule<ScreenStatusSnapshot, ScreenStatus>
> = [
  { status: ScreenStatus.Success, when: ({ hasContent }) => hasContent },
  { status: ScreenStatus.Loading, when: ({ isPending }) => isPending },
  { status: ScreenStatus.Error, when: ({ isError }) => isError },
];

export const resolveScreenStatus = (
  snapshot: ScreenStatusSnapshot,
): ScreenStatus =>
  resolveStatus(SCREEN_STATUS_RULES, snapshot, ScreenStatus.Empty);
