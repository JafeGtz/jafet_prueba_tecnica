import { AppError } from '@/core/errors/AppError';
import { toAppError } from '@/core/errors/toAppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { connectivity } from '@/core/network/connectivity';
import type { NetworkFirstOptions } from '@/data/interfaces/NetworkFirstOptions';

const readLocalOrThrow = async <T>(
  readLocal: () => Promise<T | null>,
  reason: unknown,
): Promise<T> => {
  const cached = await readLocal();

  if (cached === null) {
    throw toAppError(reason);
  }

  return cached;
};

export const networkFirst = async <T>({
  fetchRemote,
  readLocal,
  saveLocal,
}: NetworkFirstOptions<T>): Promise<T> => {
  const isOnline = await connectivity.isOnline();

  if (!isOnline) {
    return readLocalOrThrow(readLocal, new AppError(ErrorCode.Offline));
  }

  try {
    const data = await fetchRemote();
    await saveLocal(data);
    return data;
  } catch (error) {
    return readLocalOrThrow(readLocal, error);
  }
};
