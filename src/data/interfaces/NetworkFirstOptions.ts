export interface NetworkFirstOptions<T> {
  fetchRemote(): Promise<T>;
  readLocal(): Promise<T | null>;
  saveLocal(data: T): Promise<void>;
}
