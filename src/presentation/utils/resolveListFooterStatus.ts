import { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';
import type { ListFooterSnapshot } from '@/presentation/interfaces/ListFooterSnapshot';
import type { StatusRule } from '@/presentation/interfaces/StatusRule';
import { resolveStatus } from '@/presentation/utils/resolveStatus';

const LIST_FOOTER_RULES: ReadonlyArray<
  StatusRule<ListFooterSnapshot, ListFooterStatus>
> = [
  {
    status: ListFooterStatus.Loading,
    when: ({ isFetchingNextPage }) => isFetchingNextPage,
  },
  {
    status: ListFooterStatus.Error,
    when: ({ isFetchNextPageError }) => isFetchNextPageError,
  },
];

export const resolveListFooterStatus = (
  snapshot: ListFooterSnapshot,
): ListFooterStatus =>
  resolveStatus(LIST_FOOTER_RULES, snapshot, ListFooterStatus.Idle);
