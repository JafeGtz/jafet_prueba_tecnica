import { QueryClientProvider } from '@tanstack/react-query';
import React, { type PropsWithChildren } from 'react';
import { queryClient } from '@/app/config/queryClient';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
