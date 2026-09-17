jest.mock('@/core/network/connectivity', () => ({
  connectivity: {
    isOnline: jest.fn(),
    subscribe: jest.fn(),
  },
}));

import { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { connectivity } from '@/core/network/connectivity';
import { networkFirst } from '@/data/policies/networkFirst';

const isOnline = jest.mocked(connectivity.isOnline);

describe('networkFirst', () => {
  const fetchRemote = jest.fn<Promise<{ id: number }>, []>();
  const readLocal = jest.fn<Promise<{ id: number } | null>, []>();
  const saveLocal = jest.fn<Promise<void>, [{ id: number }]>();

  beforeEach(() => {
    jest.clearAllMocks();
    saveLocal.mockResolvedValue(undefined);
  });

  describe('when online', () => {
    beforeEach(() => {
      isOnline.mockResolvedValue(true);
    });

    it('fetches remote data, saves it locally, and returns it', async () => {
      const data = { id: 1 };
      fetchRemote.mockResolvedValue(data);

      const result = await networkFirst({ fetchRemote, readLocal, saveLocal });

      expect(fetchRemote).toHaveBeenCalledTimes(1);
      expect(saveLocal).toHaveBeenCalledWith(data);
      expect(result).toEqual(data);
    });

    it('returns cached data when the remote call fails', async () => {
      const cached = { id: 2 };
      fetchRemote.mockRejectedValue(new Error('network error'));
      readLocal.mockResolvedValue(cached);

      const result = await networkFirst({ fetchRemote, readLocal, saveLocal });

      expect(result).toEqual(cached);
      expect(saveLocal).not.toHaveBeenCalled();
    });

    it('rethrows a mapped AppError when remote fails and cache is empty', async () => {
      const serverError = new AppError(ErrorCode.Server);
      fetchRemote.mockRejectedValue(serverError);
      readLocal.mockResolvedValue(null);

      await expect(
        networkFirst({ fetchRemote, readLocal, saveLocal }),
      ).rejects.toMatchObject({ code: ErrorCode.Server });
    });

    it('does not call readLocal when remote succeeds', async () => {
      fetchRemote.mockResolvedValue({ id: 1 });

      await networkFirst({ fetchRemote, readLocal, saveLocal });

      expect(readLocal).not.toHaveBeenCalled();
    });
  });

  describe('when offline', () => {
    beforeEach(() => {
      isOnline.mockResolvedValue(false);
    });

    it('returns cached data without calling fetchRemote', async () => {
      const cached = { id: 3 };
      readLocal.mockResolvedValue(cached);

      const result = await networkFirst({ fetchRemote, readLocal, saveLocal });

      expect(fetchRemote).not.toHaveBeenCalled();
      expect(result).toEqual(cached);
    });

    it('throws Offline AppError when there is no cached data', async () => {
      readLocal.mockResolvedValue(null);

      await expect(
        networkFirst({ fetchRemote, readLocal, saveLocal }),
      ).rejects.toMatchObject({ code: ErrorCode.Offline });
    });

    it('does not call saveLocal when serving from cache', async () => {
      readLocal.mockResolvedValue({ id: 3 });

      await networkFirst({ fetchRemote, readLocal, saveLocal });

      expect(saveLocal).not.toHaveBeenCalled();
    });
  });
});
