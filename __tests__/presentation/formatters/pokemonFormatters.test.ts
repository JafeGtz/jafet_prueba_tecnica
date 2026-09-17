import {
  formatMeasurement,
  formatOptionalNumber,
  formatPokedexNumber,
  formatPokemonName,
} from '@/presentation/formatters/pokemonFormatters';
import { STRINGS } from '@/presentation/constants/strings.constants';

describe('formatPokemonName', () => {
  it('capitalizes a single-word name', () => {
    expect(formatPokemonName('bulbasaur')).toBe('Bulbasaur');
  });

  it('capitalizes each word in a hyphenated name', () => {
    expect(formatPokemonName('mr-mime')).toBe('Mr Mime');
  });

  it('handles a three-part hyphenated name', () => {
    expect(formatPokemonName('ho-oh')).toBe('Ho Oh');
  });

  it('preserves already-capitalized input', () => {
    expect(formatPokemonName('Pikachu')).toBe('Pikachu');
  });
});

describe('formatPokedexNumber', () => {
  it('pads single-digit ids to four characters with a # prefix', () => {
    expect(formatPokedexNumber(1)).toBe('#0001');
  });

  it('pads three-digit ids correctly', () => {
    expect(formatPokedexNumber(151)).toBe('#0151');
  });

  it('does not pad four-digit ids', () => {
    expect(formatPokedexNumber(1000)).toBe('#1000');
  });
});

describe('formatMeasurement', () => {
  it('formats a value with one decimal and the given unit', () => {
    expect(formatMeasurement(0.7, 'm')).toBe('0.7 m');
  });

  it('rounds to one decimal place', () => {
    expect(formatMeasurement(6.9, 'kg')).toBe('6.9 kg');
  });

  it('formats an integer value with one decimal place', () => {
    expect(formatMeasurement(1, 'm')).toBe('1.0 m');
  });
});

describe('formatOptionalNumber', () => {
  it('returns the number as a string when present', () => {
    expect(formatOptionalNumber(64)).toBe('64');
  });

  it('returns the empty placeholder when the value is null', () => {
    expect(formatOptionalNumber(null)).toBe(STRINGS.common.emptyValue);
  });

  it('handles 0 as a valid numeric value', () => {
    expect(formatOptionalNumber(0)).toBe('0');
  });
});
