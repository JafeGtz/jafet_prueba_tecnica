import type { AppError } from '@/core/errors/AppError';
import { ErrorCode } from '@/core/enums/ErrorCode';
import { ERROR_MESSAGES } from '@/presentation/constants/errorMessages.constants';
import type { ErrorMessage } from '@/presentation/interfaces/ErrorMessage';

export const resolveErrorMessage = (error: AppError | null): ErrorMessage =>
  ERROR_MESSAGES[error?.code ?? ErrorCode.Unknown] ??
  ERROR_MESSAGES[ErrorCode.Unknown];
