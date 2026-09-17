import '@tanstack/react-query';
import type { AppError } from '@/core/errors/AppError';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AppError;
  }
}
