import { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { ERROR_MESSAGES } from '@/presentation/constants/errorMessages.constants';
import { resolveErrorMessage } from '@/presentation/utils/resolveErrorMessage';

describe('resolveErrorMessage', () => {
  it.each(Object.values(ErrorCode))(
    'returns the correct message for ErrorCode.%s',
    code => {
      const error = new AppError(code as ErrorCode);
      const result = resolveErrorMessage(error);
      expect(result).toEqual(ERROR_MESSAGES[code as ErrorCode]);
    },
  );

  it('returns the Unknown message when error is null', () => {
    const result = resolveErrorMessage(null);
    expect(result).toEqual(ERROR_MESSAGES[ErrorCode.Unknown]);
  });

  it('returns a message with both title and message fields', () => {
    const error = new AppError(ErrorCode.Offline);
    const result = resolveErrorMessage(error);
    expect(result.title).toBeTruthy();
    expect(result.message).toBeTruthy();
  });
});
