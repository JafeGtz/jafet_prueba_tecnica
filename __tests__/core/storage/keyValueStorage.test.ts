import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyValueStorage } from '@/core/storage/keyValueStorage';

describe('keyValueStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItem', () => {
    it('returns the parsed value for an existing key', async () => {
      const payload = { id: 1, name: 'bulbasaur' };
      jest
        .mocked(AsyncStorage.getItem)
        .mockResolvedValueOnce(JSON.stringify(payload));

      const result = await keyValueStorage.getItem<typeof payload>('key');

      expect(result).toEqual(payload);
    });

    it('returns null when the key does not exist', async () => {
      jest.mocked(AsyncStorage.getItem).mockResolvedValueOnce(null);

      const result = await keyValueStorage.getItem('missing');

      expect(result).toBeNull();
    });

    it('returns null when the stored value is corrupted JSON', async () => {
      jest
        .mocked(AsyncStorage.getItem)
        .mockResolvedValueOnce('{not valid json}');

      const result = await keyValueStorage.getItem('corrupted');

      expect(result).toBeNull();
    });

    it('returns null when AsyncStorage throws', async () => {
      jest
        .mocked(AsyncStorage.getItem)
        .mockRejectedValueOnce(new Error('storage unavailable'));

      const result = await keyValueStorage.getItem('error-key');

      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('serializes the value as JSON and stores it', async () => {
      const payload = { id: 1, name: 'bulbasaur' };

      await keyValueStorage.setItem('key', payload);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'key',
        JSON.stringify(payload),
      );
    });

    it('stores primitive values correctly', async () => {
      await keyValueStorage.setItem('num', 42);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('num', '42');
    });

    it('resolves without throwing when AsyncStorage.setItem rejects', async () => {
      jest
        .mocked(AsyncStorage.setItem)
        .mockRejectedValueOnce(new Error('write error'));

      await expect(keyValueStorage.setItem('key', {})).resolves.toBeUndefined();
    });
  });
});
