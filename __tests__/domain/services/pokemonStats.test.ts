import {
  calculateStatRatio,
  calculateTotalBaseStats,
} from '@/domain/services/pokemonStats';
import { PokemonStatName } from '@/domain/enums/PokemonStatName';
import { POKEMON_STATS } from '@/domain/constants/pokemon.constants';

describe('calculateTotalBaseStats', () => {
  it('returns the sum of all base values', () => {
    const stats = [
      { name: PokemonStatName.Hp, baseValue: 45 },
      { name: PokemonStatName.Attack, baseValue: 49 },
      { name: PokemonStatName.Defense, baseValue: 49 },
      { name: PokemonStatName.SpecialAttack, baseValue: 65 },
      { name: PokemonStatName.SpecialDefense, baseValue: 65 },
      { name: PokemonStatName.Speed, baseValue: 45 },
    ];
    expect(calculateTotalBaseStats(stats)).toBe(318);
  });

  it('returns 0 for an empty stats array', () => {
    expect(calculateTotalBaseStats([])).toBe(0);
  });

  it('handles a single stat', () => {
    expect(
      calculateTotalBaseStats([{ name: PokemonStatName.Hp, baseValue: 100 }]),
    ).toBe(100);
  });
});

describe('calculateStatRatio', () => {
  it('returns 1 for the maximum base value', () => {
    expect(calculateStatRatio(POKEMON_STATS.MAX_BASE_VALUE)).toBeCloseTo(1);
  });

  it('returns 0 for a base value of 0', () => {
    expect(calculateStatRatio(0)).toBe(0);
  });

  it('clamps values above the maximum to 1', () => {
    expect(calculateStatRatio(POKEMON_STATS.MAX_BASE_VALUE + 100)).toBe(1);
  });

  it('clamps negative values to 0', () => {
    expect(calculateStatRatio(-10)).toBe(0);
  });

  it.each([
    [51, 0.2],
    [127, 0.498],
    [255, 1.0],
  ])('returns approximately %f for base value %i', (value, expected) => {
    expect(calculateStatRatio(value)).toBeCloseTo(expected, 1);
  });
});
