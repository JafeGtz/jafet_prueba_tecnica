import { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import type { ScreenStatusSnapshot } from '@/presentation/interfaces/ScreenStatusSnapshot';
import { resolveScreenStatus } from '@/presentation/utils/resolveScreenStatus';

describe('resolveScreenStatus', () => {
  it.each<[ScreenStatusSnapshot, ScreenStatus]>([
    [
      { hasContent: true, isPending: false, isError: false },
      ScreenStatus.Success,
    ],
    [
      { hasContent: false, isPending: true, isError: false },
      ScreenStatus.Loading,
    ],
    [
      { hasContent: false, isPending: false, isError: true },
      ScreenStatus.Error,
    ],
    [
      { hasContent: false, isPending: false, isError: false },
      ScreenStatus.Empty,
    ],
    [
      { hasContent: true, isPending: true, isError: false },
      ScreenStatus.Success,
    ],
    [
      { hasContent: true, isPending: false, isError: true },
      ScreenStatus.Success,
    ],
    [
      { hasContent: false, isPending: true, isError: true },
      ScreenStatus.Loading,
    ],
  ])('returns %s for snapshot %j', (snapshot, expected) => {
    expect(resolveScreenStatus(snapshot)).toBe(expected);
  });
});
