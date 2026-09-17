import AsyncStorage from '@react-native-async-storage/async-storage';
import type { KeyValueStorage } from '@/core/interfaces/KeyValueStorage';

const parseJson = <T>(raw: string): T | null => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const keyValueStorage: KeyValueStorage = {
  async getItem<T>(key: string) {
    const raw = await AsyncStorage.getItem(key).catch(() => null);
    return raw === null ? null : parseJson<T>(raw);
  },

  async setItem<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value)).catch(
      () => undefined,
    );
  },
};
