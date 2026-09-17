import type { ScreenStatus } from '@/presentation/enums/ScreenStatus';
import type { ErrorMessage } from '@/presentation/interfaces/ErrorMessage';
import type { PokemonDetailViewData } from '@/presentation/models/PokemonDetailViewData';

export interface PokemonDetailViewModel {
  title: string;
  subtitle: string;
  status: ScreenStatus;
  detail: PokemonDetailViewData | undefined;
  error: ErrorMessage;
  retry(): void;
  goBack(): void;
}
