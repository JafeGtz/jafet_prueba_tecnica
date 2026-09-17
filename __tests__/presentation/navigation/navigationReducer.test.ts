import { NavigationActionType } from '@/presentation/enums/NavigationActionType';
import { Route } from '@/presentation/enums/Route';
import type { StackEntry } from '@/presentation/types/navigation.types';
import {
  getOpenEntries,
  navigationReducer,
} from '@/presentation/navigation/navigationReducer';

const makeEntry = (route: Route, key: string, isClosing = false): StackEntry =>
  ({
    key,
    route,
    params:
      route === Route.PokemonDetail
        ? { pokemonId: 1, pokemonName: 'Bulbasaur' }
        : undefined,
    isClosing,
  } as StackEntry);

const listEntry = makeEntry(Route.PokemonList, 'list-1');
const detailEntry = makeEntry(Route.PokemonDetail, 'detail-1');

describe('navigationReducer', () => {
  describe('Push action', () => {
    it('appends the new entry to the stack', () => {
      const result = navigationReducer([listEntry], {
        type: NavigationActionType.Push,
        entry: detailEntry,
      });
      expect(result).toHaveLength(2);
      expect(result[1]).toBe(detailEntry);
    });

    it('does not mutate the original stack', () => {
      const original = [listEntry];
      navigationReducer(original, {
        type: NavigationActionType.Push,
        entry: detailEntry,
      });
      expect(original).toHaveLength(1);
    });
  });

  describe('Close action', () => {
    it('marks the top open entry as closing', () => {
      const result = navigationReducer([listEntry, detailEntry], {
        type: NavigationActionType.Close,
      });
      const top = result.find(e => e.key === 'detail-1');
      expect(top?.isClosing).toBe(true);
    });

    it('leaves other entries untouched', () => {
      const result = navigationReducer([listEntry, detailEntry], {
        type: NavigationActionType.Close,
      });
      const root = result.find(e => e.key === 'list-1');
      expect(root?.isClosing).toBe(false);
    });

    it('is a no-op when there is only one open entry', () => {
      const result = navigationReducer([listEntry], {
        type: NavigationActionType.Close,
      });
      expect(result).toHaveLength(1);
      expect(result[0].isClosing).toBe(false);
    });

    it('does not close an already-closing entry when a second close is issued', () => {
      const closingDetail = makeEntry(Route.PokemonDetail, 'detail-1', true);
      const result = navigationReducer([listEntry, closingDetail], {
        type: NavigationActionType.Close,
      });
      expect(result[0].isClosing).toBe(false);
    });
  });

  describe('Remove action', () => {
    it('removes the entry with the matching key', () => {
      const result = navigationReducer([listEntry, detailEntry], {
        type: NavigationActionType.Remove,
        key: 'detail-1',
      });
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('list-1');
    });

    it('leaves the stack unchanged when the key does not match any entry', () => {
      const result = navigationReducer([listEntry], {
        type: NavigationActionType.Remove,
        key: 'nonexistent-key',
      });
      expect(result).toHaveLength(1);
    });
  });
});

describe('getOpenEntries', () => {
  it('filters out closing entries', () => {
    const closing = makeEntry(Route.PokemonDetail, 'detail-1', true);
    expect(getOpenEntries([listEntry, closing])).toEqual([listEntry]);
  });

  it('returns all entries when none are closing', () => {
    expect(getOpenEntries([listEntry, detailEntry])).toHaveLength(2);
  });
});
