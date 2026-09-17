import type { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';

export interface PokemonListFooterProps {
  status: ListFooterStatus;
  onRetry(): void;
}
