jest.mock('@/application/useCases/getPokemonDetail');

import React, { type PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react-test-renderer';
import { getPokemonDetail } from '@/application/useCases/getPokemonDetail';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import type { NavigationContextValue } from '@/presentation/interfaces/NavigationContextValue';
import { NavigationContext } from '@/presentation/navigation/NavigationContext';
import { RouteContext } from '@/presentation/navigation/RouteContext';
import { Route } from '@/presentation/enums/Route';
import type { StackEntry } from '@/presentation/types/navigation.types';
import { usePokemonDetailViewModel } from '@/presentation/screens/PokemonDetail/usePokemonDetailViewModel';
import { renderHook } from '../../../support/renderHook';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

const navValue: NavigationContextValue = {
  canGoBack: true,
  navigate: mockNavigate as NavigationContextValue['navigate'],
  goBack: mockGoBack,
};

const routeEntry: StackEntry = {
  key: 'PokemonDetail-1',
  route: Route.PokemonDetail,
  params: { pokemonId: 1, pokemonName: 'Bulbasaur' },
  isClosing: false,
} as StackEntry;

const mockDetail: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  imageUrl: 'https://art.example.com/1.png',
  types: [PokemonTypeName.Grass, PokemonTypeName.Poison],
  abilities: [
    { name: 'overgrow', isHidden: false },
    { name: 'chlorophyll', isHidden: true },
  ],
  stats: [
    { name: PokemonStatName.Hp, baseValue: 45 },
    { name: PokemonStatName.Attack, baseValue: 49 },
  ],
  heightInMeters: 0.7,
  weightInKilograms: 6.9,
  baseExperience: 64,
};

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
      <RouteContext.Provider value={routeEntry}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </RouteContext.Provider>
    </NavigationContext.Provider>
  );
};

describe('usePokemonDetailViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('starts in Loading status before the query resolves', async () => {
    jest.mocked(getPokemonDetail).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.status).toBe(ScreenStatus.Loading);
    expect(result.current.detail).toBeUndefined();
  });

  it('sets the title from the route param pokemon name', async () => {
    jest.mocked(getPokemonDetail).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.title).toBe('Bulbasaur');
  });

  it('sets the subtitle as the formatted pokedex number', async () => {
    jest.mocked(getPokemonDetail).mockReturnValue(new Promise(() => {}));

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    expect(result.current.subtitle).toBe('#0001');
  });

  it('transitions to Success and exposes view data after a successful fetch', async () => {
    jest.mocked(getPokemonDetail).mockResolvedValue(mockDetail);

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.status).toBe(ScreenStatus.Success);
    expect(result.current.detail).toBeDefined();
    expect(result.current.detail?.name).toBe('Bulbasaur');
  });

  it('transitions to Error status when the query fails', async () => {
    jest.mocked(getPokemonDetail).mockRejectedValue(new Error('network error'));

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.status).toBe(ScreenStatus.Error);
    expect(result.current.detail).toBeUndefined();
  });

  it('exposes an error message with title and message when in error state', async () => {
    jest.mocked(getPokemonDetail).mockRejectedValue(new Error('network error'));

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    expect(result.current.error.title).toBeTruthy();
    expect(result.current.error.message).toBeTruthy();
  });

  it('calls goBack when the goBack function is invoked', async () => {
    jest.mocked(getPokemonDetail).mockResolvedValue(mockDetail);

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    act(() => {
      result.current.goBack();
    });

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('exposes detail view data with types, abilities and stats after success', async () => {
    jest.mocked(getPokemonDetail).mockResolvedValue(mockDetail);

    const { result } = await renderHook(() => usePokemonDetailViewModel(), {
      wrapper: createWrapper(),
    });

    await flushQuery();

    const { detail } = result.current;
    expect(detail?.types).toHaveLength(2);
    expect(detail?.stats).toHaveLength(2);
    expect(detail?.abilities).toHaveLength(2);
  });
});
