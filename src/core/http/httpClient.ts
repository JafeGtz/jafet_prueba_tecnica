import { HTTP_CONFIG } from '@/core/constants/http.constants';
import { AppError } from '@/core/errors/AppError';
import { httpStatusToErrorCode } from '@/core/errors/httpStatusToErrorCode';
import { toAppError } from '@/core/errors/toAppError';
import type { HttpClient } from '@/core/interfaces/HttpClient';
import type { QueryParams } from '@/core/types/http.types';

const toQueryString = (params: QueryParams = {}): string =>
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

const buildUrl = (path: string, params?: QueryParams): string => {
  const queryString = toQueryString(params);
  const url = `${HTTP_CONFIG.BASE_URL}${path}`;
  return queryString ? `${url}?${queryString}` : url;
};

const get = async <T>(path: string, params?: QueryParams): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    HTTP_CONFIG.REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(buildUrl(path, params), {
      headers: HTTP_CONFIG.DEFAULT_HEADERS,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new AppError(httpStatusToErrorCode(response.status));
    }

    return (await response.json()) as T;
  } catch (error) {
    throw toAppError(error);
  } finally {
    clearTimeout(timeoutId);
  }
};

export const httpClient: HttpClient = { get };
