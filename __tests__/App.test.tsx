jest.mock('@/application/useCases/getPokemonPage');
jest.mock('@/presentation/hooks/useGridLayout', () => ({
  useGridLayout: () => ({ columns: 2, itemWidth: '50%' }),
}));

import React from 'react';
import { act, create } from 'react-test-renderer';
import { getPokemonPage } from '@/application/useCases/getPokemonPage';
import { queryClient } from '@/app/config/queryClient';
import { App } from '@/app/App';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await jest.runAllTimersAsync();
    jest.useRealTimers();
    queryClient.clear();
  });

  it('mounts without throwing', async () => {
    jest.mocked(getPokemonPage).mockReturnValue(new Promise(() => {}));

    let renderer: ReturnType<typeof create> | undefined;

    await act(async () => {
      renderer = create(<App />);
    });

    expect(renderer).toBeDefined();

    await act(async () => {
      renderer?.unmount();
    });
  });
});
