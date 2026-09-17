import { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';
import type { ListFooterSnapshot } from '@/presentation/interfaces/ListFooterSnapshot';
import { resolveListFooterStatus } from '@/presentation/utils/resolveListFooterStatus';

describe('resolveListFooterStatus', () => {
  it.each<[ListFooterSnapshot, ListFooterStatus]>([
    [
      { isFetchingNextPage: true, isFetchNextPageError: false },
      ListFooterStatus.Loading,
    ],
    [
      { isFetchingNextPage: false, isFetchNextPageError: true },
      ListFooterStatus.Error,
    ],
    [
      { isFetchingNextPage: false, isFetchNextPageError: false },
      ListFooterStatus.Idle,
    ],
    [
      { isFetchingNextPage: true, isFetchNextPageError: true },
      ListFooterStatus.Loading,
    ],
  ])('returns %s for snapshot %j', (snapshot, expected) => {
    expect(resolveListFooterStatus(snapshot)).toBe(expected);
  });
});
