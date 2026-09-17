export interface ArtworkDto {
  front_default: string | null;
}

export interface PokemonSpritesDto {
  front_default: string | null;
  other?: {
    'official-artwork'?: ArtworkDto;
  };
}
