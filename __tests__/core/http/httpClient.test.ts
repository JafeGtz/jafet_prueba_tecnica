import { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { HTTP_CONFIG } from '@/core/constants/http.constants';
import { httpClient } from '@/core/http/httpClient';

describe('httpClient.get', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  const okResponse = (data: unknown) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    } as Response);

  it('builds the full URL with encoded query params', async () => {
    fetchSpy.mockReturnValueOnce(okResponse({ id: 1 }));

    await httpClient.get('/pokemon', { offset: 0, limit: 20 });

    expect(fetchSpy).toHaveBeenCalledWith(
      `${HTTP_CONFIG.BASE_URL}/pokemon?offset=0&limit=20`,
      expect.objectContaining({ headers: HTTP_CONFIG.DEFAULT_HEADERS }),
    );
  });

  it('percent-encodes special characters in query param values', async () => {
    fetchSpy.mockReturnValueOnce(okResponse({}));

    await httpClient.get('/pokemon', { q: 'mr mime' });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('mr%20mime'),
      expect.any(Object),
    );
  });

  it('omits the query string when no params are provided', async () => {
    fetchSpy.mockReturnValueOnce(okResponse({}));

    await httpClient.get('/pokemon/1');

    expect(fetchSpy).toHaveBeenCalledWith(
      `${HTTP_CONFIG.BASE_URL}/pokemon/1`,
      expect.any(Object),
    );
  });

  it('returns the parsed JSON body on a successful response', async () => {
    const payload = { id: 1, name: 'bulbasaur' };
    fetchSpy.mockReturnValueOnce(okResponse(payload));

    const result = await httpClient.get('/pokemon/1');

    expect(result).toEqual(payload);
  });

  it('throws AppError with NotFound code for a 404 response', async () => {
    fetchSpy.mockReturnValueOnce(
      Promise.resolve({ ok: false, status: 404 } as Response),
    );

    await expect(httpClient.get('/pokemon/99999')).rejects.toMatchObject({
      code: ErrorCode.NotFound,
    });
  });

  it('throws AppError with Server code for a 500 response', async () => {
    fetchSpy.mockReturnValueOnce(
      Promise.resolve({ ok: false, status: 500 } as Response),
    );

    await expect(httpClient.get('/pokemon')).rejects.toMatchObject({
      code: ErrorCode.Server,
    });
  });

  it('throws AppError with Unknown code for a 400 response', async () => {
    fetchSpy.mockReturnValueOnce(
      Promise.resolve({ ok: false, status: 400 } as Response),
    );

    await expect(httpClient.get('/pokemon')).rejects.toMatchObject({
      code: ErrorCode.Unknown,
    });
  });

  it('wraps a TypeError as a Network AppError', async () => {
    fetchSpy.mockRejectedValueOnce(new TypeError('network failure'));

    await expect(httpClient.get('/pokemon')).rejects.toMatchObject({
      code: ErrorCode.Network,
    });
  });

  it('always rejects with an AppError instance', async () => {
    fetchSpy.mockReturnValueOnce(
      Promise.resolve({ ok: false, status: 500 } as Response),
    );

    await expect(httpClient.get('/pokemon')).rejects.toBeInstanceOf(AppError);
  });

  it('aborts the request and throws Timeout when the timeout elapses', async () => {
    jest.useFakeTimers();

    fetchSpy.mockImplementationOnce(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          (init.signal as AbortSignal).addEventListener('abort', () => {
            const err = new Error('The user aborted a request.');
            err.name = 'AbortError';
            reject(err);
          });
        }),
    );

    const pending = httpClient.get('/pokemon');
    jest.runAllTimers();

    await expect(pending).rejects.toMatchObject({ code: ErrorCode.Timeout });

    jest.useRealTimers();
  });
});
