import { ErrorCode } from '@/core/enums/ErrorCode';
import { httpStatusToErrorCode } from '@/core/errors/httpStatusToErrorCode';

describe('httpStatusToErrorCode', () => {
  it('maps 404 to NotFound', () => {
    expect(httpStatusToErrorCode(404)).toBe(ErrorCode.NotFound);
  });

  it.each([500, 501, 503, 504, 520])(
    'maps %i (server error) to Server',
    status => {
      expect(httpStatusToErrorCode(status)).toBe(ErrorCode.Server);
    },
  );

  it.each([400, 401, 403, 409, 422])(
    'maps %i (other 4xx) to Unknown',
    status => {
      expect(httpStatusToErrorCode(status)).toBe(ErrorCode.Unknown);
    },
  );
});
