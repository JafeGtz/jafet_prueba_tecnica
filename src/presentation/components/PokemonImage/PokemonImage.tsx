import React from 'react';
import { Image, View } from 'react-native';
import { Pokeball } from '@/presentation/components/Pokeball/Pokeball';
import { styles } from '@/presentation/components/PokemonImage/PokemonImage.styles';
import type { PokemonImageProps } from '@/presentation/components/PokemonImage/PokemonImage.types';
import { usePokemonImage } from '@/presentation/components/PokemonImage/usePokemonImage';

export const PokemonImage = ({ uri, size }: PokemonImageProps) => {
  const { source, frameStyle, watermarkSize } = usePokemonImage(uri, size);

  return (
    <View style={[styles.frame, frameStyle]}>
      <View style={styles.watermark}>
        <Pokeball size={watermarkSize} />
      </View>
      <Image
        source={source}
        style={frameStyle}
        resizeMode="contain"
        accessible={false}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
};
