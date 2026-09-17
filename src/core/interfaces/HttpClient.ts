import type { QueryParams } from '@/core/types/http.types';

export interface HttpClient {
  get<T>(path: string, params?: QueryParams): Promise<T>;
}
