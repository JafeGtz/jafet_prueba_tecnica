import {
  toPokemonCardViewData,
  toPokemonDetailViewData,
} from '@/presentation/mappers/pokemonViewDataMapper';
import type { PokemonDetail } from '@/domain/models/PokemonDetail';
import type { PokemonSummary } from '@/domain/models/PokemonSummary';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { PokemonTypeName } from '@/domain/enums/PokemonTypeName';
import { AbilityVariant } from '@/presentation/enums/AbilityVariant';
import { typeColors } from '@/presentation/theme/typeColors';

const summary: PokemonSummary = {
  id: 1,
  name: 'bulbasaur',
  imageUrl: 'https://art.example.com/1.png',
};

const detail: PokemonDetail = {
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

describe('toPokemonCardViewData', () => {
  it('formats the pokemon name with capitalization', () => {
    const card = toPokemonCardViewData(summary);
    expect(card.name).toBe('Bulbasaur');
  });

  it('formats the id as a zero-padded pokedex number', () => {
    const card = toPokemonCardViewData(summary);
    expect(card.number).toBe('#0001');
  });

  it('uses the string id as the key', () => {
    const card = toPokemonCardViewData(summary);
    expect(card.key).toBe('1');
  });

  it('preserves the original id and imageUrl', () => {
    const card = toPokemonCardViewData(summary);
    expect(card.id).toBe(1);
    expect(card.imageUrl).toBe(summary.imageUrl);
  });

  it('builds an accessibility label combining name and id', () => {
    const card = toPokemonCardViewData(summary);
    expect(card.accessibilityLabel).toContain('Bulbasaur');
    expect(card.accessibilityLabel).toContain('1');
  });

  it('capitalizes each word in a hyphenated name', () => {
    const card = toPokemonCardViewData({
      ...summary,
      name: 'mr-mime',
      id: 122,
    });
    expect(card.name).toBe('Mr Mime');
  });
});

describe('toPokemonDetailViewData', () => {
  it('maps types to TypeBadgeViewData with correct key and colors', () => {
    const viewData = toPokemonDetailViewData(detail);
    expect(viewData.types[0].key).toBe(PokemonTypeName.Grass);
    expect(viewData.types[0].colors).toEqual(typeColors[PokemonTypeName.Grass]);
  });

  it('uses the primary type background as the accent color', () => {
    const viewData = toPokemonDetailViewData(detail);
    expect(viewData.accentColor).toBe(
      typeColors[PokemonTypeName.Grass].background,
    );
  });

  it('uses unknown type accent color when types array is empty', () => {
    const viewData = toPokemonDetailViewData({ ...detail, types: [] });
    expect(viewData.accentColor).toBe(
      typeColors[PokemonTypeName.Unknown].background,
    );
  });

  it('maps a regular ability with Regular variant', () => {
    const viewData = toPokemonDetailViewData(detail);
    const overgrow = viewData.abilities.find(a => a.key === 'overgrow');
    expect(overgrow?.variant).toBe(AbilityVariant.Regular);
    expect(overgrow?.label).toBe('Overgrow');
  });

  it('maps a hidden ability with Hidden variant and appends the hidden marker', () => {
    const viewData = toPokemonDetailViewData(detail);
    const chlorophyll = viewData.abilities.find(a => a.key === 'chlorophyll');
    expect(chlorophyll?.variant).toBe(AbilityVariant.Hidden);
    expect(chlorophyll?.label).toContain('oculta');
  });

  it('maps stats with correct ratio clamped between 0 and 1', () => {
    const viewData = toPokemonDetailViewData(detail);
    viewData.stats.forEach(stat => {
      expect(stat.ratio).toBeGreaterThanOrEqual(0);
      expect(stat.ratio).toBeLessThanOrEqual(1);
    });
  });

  it('computes totalStats as the string sum of all base values', () => {
    const viewData = toPokemonDetailViewData(detail);
    expect(viewData.totalStats).toBe('94');
  });

  it('includes height, weight and baseExperience measurements', () => {
    const viewData = toPokemonDetailViewData(detail);
    const keys = viewData.measurements.map(m => m.key);
    expect(keys).toContain('height');
    expect(keys).toContain('weight');
    expect(keys).toContain('baseExperience');
  });

  it('builds a typesAccessibilityLabel containing the type labels', () => {
    const viewData = toPokemonDetailViewData(detail);
    expect(viewData.typesAccessibilityLabel).toContain('Planta');
    expect(viewData.typesAccessibilityLabel).toContain('Veneno');
  });

  it('formats the pokedex number', () => {
    const viewData = toPokemonDetailViewData(detail);
    expect(viewData.number).toBe('#0001');
  });
});
