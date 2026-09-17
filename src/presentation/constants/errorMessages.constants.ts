import { ErrorCode } from '@/core/enums/ErrorCode';
import type { ErrorMessage } from '@/presentation/interfaces/ErrorMessage';

export const ERROR_MESSAGES: Record<ErrorCode, ErrorMessage> = {
  [ErrorCode.Offline]: {
    title: 'Estás sin conexión',
    message:
      'Este contenido aún no está guardado en tu dispositivo. Conéctate para verlo.',
  },
  [ErrorCode.Timeout]: {
    title: 'La conexión está lenta',
    message: 'El servidor tardó demasiado en responder. Inténtalo de nuevo.',
  },
  [ErrorCode.Network]: {
    title: 'No pudimos conectarnos',
    message: 'Revisa tu conexión a internet e inténtalo de nuevo.',
  },
  [ErrorCode.NotFound]: {
    title: 'Pokémon no encontrado',
    message: 'No encontramos información para este Pokémon.',
  },
  [ErrorCode.Server]: {
    title: 'PokéAPI no responde',
    message:
      'El servicio tiene problemas en este momento. Vuelve a intentarlo más tarde.',
  },
  [ErrorCode.Unknown]: {
    title: 'Algo salió mal',
    message: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
  },
};
