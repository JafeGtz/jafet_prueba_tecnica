import type { ReactElement } from 'react';
import type { QueryStateViewProps } from '@/presentation/components/QueryStateView/QueryStateView.types';
import { ScreenStatus } from '@/presentation/enums/ScreenStatus';

export const QueryStateView = <T,>({
  status,
  data,
  loading,
  error,
  empty,
  renderContent,
}: QueryStateViewProps<T>): ReactElement => {
  const views: Record<ScreenStatus, () => ReactElement> = {
    [ScreenStatus.Loading]: () => loading,
    [ScreenStatus.Error]: () => error,
    [ScreenStatus.Empty]: () => empty,
    [ScreenStatus.Success]: () =>
      data === undefined ? empty : renderContent(data),
  };

  return views[status]();
};
