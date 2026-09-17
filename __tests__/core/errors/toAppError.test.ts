import { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { toAppError } from '@/core/errors/toAppError';

describe('toAppError', () => {
  it('returns the same AppError instance when the input is already an AppError', () => {
    const original = new AppError(ErrorCode.NotFound);
    expect(toAppError(original)).toBe(original);
  });

  it('preserves the error code when passing through an AppError', () => {
    const original = new AppError(ErrorCode.Server);
    expect(toAppError(original).code).toBe(ErrorCode.Server);
  });

  it('maps an AbortError to Timeout', () => {
    const abortError = { name: 'AbortError' };
    expect(toAppError(abortError).code).toBe(ErrorCode.Timeout);
  });

  it('maps an AbortError instance (with name property) to Timeout', () => {
    const err = Object.assign(new Error('aborted'), { name: 'AbortError' });
    expect(toAppError(err).code).toBe(ErrorCode.Timeout);
  });

  it('maps a TypeError to Network', () => {
    expect(toAppError(new TypeError('failed to fetch')).code).toBe(
      ErrorCode.Network,
    );
  });

  it('maps an unknown Error to Unknown', () => {
    expect(toAppError(new Error('something weird')).code).toBe(
      ErrorCode.Unknown,
    );
  });

  it('maps null to Unknown', () => {
    expect(toAppError(null).code).toBe(ErrorCode.Unknown);
  });

  it('maps a plain string to Unknown', () => {
    expect(toAppError('error string').code).toBe(ErrorCode.Unknown);
  });

  it('maps a plain object without a matching name to Unknown', () => {
    expect(toAppError({ name: 'SomeOtherError' }).code).toBe(ErrorCode.Unknown);
  });

  it('always returns an AppError instance', () => {
    expect(toAppError('anything')).toBeInstanceOf(AppError);
  });
});
