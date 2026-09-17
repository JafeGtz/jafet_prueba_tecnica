import type { ReactElement } from 'react';
import type { ScreenStatus } from '@/presentation/enums/ScreenStatus';

export interface QueryStateViewProps<T> {
  status: ScreenStatus;
  data: T | undefined;
  loading: ReactElement;
  error: ReactElement;
  empty: ReactElement;
  renderContent(data: T): ReactElement;
}
