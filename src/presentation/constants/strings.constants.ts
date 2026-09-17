import { AbilityVariant } from '@/presentation/enums/AbilityVariant';

export const STRINGS = {
  common: {
    retry: 'Reintentar',
    back: 'Volver',
    backHint: 'Regresa a la pantalla anterior',
    emptyValue: '—',
  },
  offlineBanner: 'Sin conexión · mostrando datos guardados',
  pokemonList: {
    title: 'Pokédex',
    subtitle: 'Elige un Pokémon para ver su ficha',
    emptyTitle: 'No hay Pokémon para mostrar',
    emptyMessage: 'Intenta cargar la lista otra vez.',
    loadMoreError: 'No se pudieron cargar más Pokémon.',
    loadingLabel: 'Cargando Pokémon',
    cardHint: 'Abre la ficha del Pokémon',
    cardLabel: (name: string, id: number) => `${name}, número ${id}`,
  },
  pokemonDetail: {
    loadingLabel: 'Cargando ficha',
    measurementsTitle: 'Información',
    abilitiesTitle: 'Habilidades',
    statsTitle: 'Estadísticas base',
    height: 'Altura',
    weight: 'Peso',
    baseExperience: 'Exp. base',
    total: 'Total',
    typesLabel: (types: string) => `Tipos: ${types}`,
    statLabel: (stat: string, value: number, max: number) =>
      `${stat}: ${value} de ${max}`,
    abilityLabel: {
      [AbilityVariant.Regular]: (name: string) => name,
      [AbilityVariant.Hidden]: (name: string) => `${name} (oculta)`,
    },
  },
  units: {
    meters: 'm',
    kilograms: 'kg',
  },
} as const;
