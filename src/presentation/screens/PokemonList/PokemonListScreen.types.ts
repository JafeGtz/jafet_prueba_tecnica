import type { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';
import type { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import type { ErrorMessage } from '@/presentation/interfaces/ErrorMessage';
import type { GridLayout } from '@/presentation/interfaces/GridLayout';
import type { PokemonCardViewData } from '@/presentation/models/PokemonCardViewData';

export interface PokemonListViewModel {
  status: ScreenStatus;
  pokemons: PokemonCardViewData[];
  error: ErrorMessage;
  footerStatus: ListFooterStatus;
  grid: GridLayout;
  isRefreshing: boolean;
  loadMore(): void;
  retryLoadMore(): void;
  refresh(): void;
  retry(): void;
  selectPokemon(pokemon: PokemonCardViewData): void;
}
