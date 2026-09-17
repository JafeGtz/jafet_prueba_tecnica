jest.mock('@/application/useCases/getPokemonPage');
jest.mock('@/presentation/hooks/useGridLayout', () => ({
  useGridLayout: () => ({ columns: 2, itemWidth: '50%' }),
}));

import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react-test-renderer';
import { getPokemonPage } from '@/application/useCases/getPokemonPage';
import type { PokemonPage } from '@/domain/models/PokemonPage';
import { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';
import { Route } from '@/presentation/enums/Route';
import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';
import { NavigationContext } from '@/presentation/navigation/NavigationContext';
import { usePokemonListViewModel } from '@/presentation/screens/PokemonList/usePokemonListViewModel';
import { renderHook } from '../../../support/renderHook';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const navValue: NavigationContextValue = {
  canGoBack: false,
  navigate: mockNavigate as NavigationContextValue['navigate'],
  goBack: mockGoBack,
};

const makePage = (nextOffset: number | null = 20): PokemonPage => ({
  items: [
    { id: 1, name: 'bulbasaur', imageUrl: 'https://art.example.com/1.png' },
  ],
  totalCount: 151,
  nextOffset,
});

const flushQuery = () =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(200);
  });

const createWrapper = (): React.ComponentType<PropsWithChildren> => {
  const qc = new QueryClient({
    defaultOptions: {
      queries: { retry: false, networkMode: 'always' },
    },
  });
  return ({ children }: PropsWithChildren) => (
    <NavigationContext.Provider value={navValue}>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </NavigationContext.Provider>
  );
};

describe('usePokemonListViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('starts in Loading status before the query resolves', async () => {
    jest.mocked(getPokemonPage).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.status).toBe(ScreenStatus.Loading);
    expect(result.current.pokemons).toHaveLength(0);
  });

  it('transitions to Success and exposes pokemon cards after a successful fetch', async () => {
    jest.mocked(getPokemonPage).mockResolvedValue(makePage());

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.status).toBe(ScreenStatus.Success);
    expect(result.current.pokemons).toHaveLength(1);
    expect(result.current.pokemons[0].name).toBe('Bulbasaur');
  });

  it('transitions to Error status when the query fails', async () => {
    jest.mocked(getPokemonPage).mockRejectedValue(new Error('network error'));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.status).toBe(ScreenStatus.Error);
    expect(result.current.pokemons).toHaveLength(0);
  });

  it('exposes an error message object when in error state', async () => {
    jest.mocked(getPokemonPage).mockRejectedValue(new Error('network error'));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.error.title).toBeTruthy();
    expect(result.current.error.message).toBeTruthy();
  });

  it('calls navigate with PokemonDetail route and correct params on selectPokemon', async () => {
    jest.mocked(getPokemonPage).mockResolvedValue(makePage());

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    const [card] = result.current.pokemons;
    act(() => {
      result.current.selectPokemon(card);
    });

    expect(mockNavigate).toHaveBeenCalledWith(Route.PokemonDetail, {
      pokemonId: 1,
      pokemonName: 'Bulbasaur',
    });
  });

  it('does not trigger a fetch when loadMore is called with no next page', async () => {
    jest.mocked(getPokemonPage).mockResolvedValue(makePage(null));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    const callCountAfterLoad = jest.mocked(getPokemonPage).mock.calls.length;

    act(() => {
      result.current.loadMore();
    });

    await flushQuery();

    expect(jest.mocked(getPokemonPage).mock.calls.length).toBe(
      callCountAfterLoad,
    );
  });

  it('exposes footerStatus as Idle when not fetching a next page', async () => {
    jest.mocked(getPokemonPage).mockResolvedValue(makePage());

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.footerStatus).toBe(ListFooterStatus.Idle);
  });

  it('starts with isRefreshing false', async () => {
    jest.mocked(getPokemonPage).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isRefreshing).toBe(false);
  });

  it('exposes the grid layout from useGridLayout', async () => {
    jest.mocked(getPokemonPage).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonListViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.grid).toEqual({ columns: 2, itemWidth: '50%' });
  });
});
