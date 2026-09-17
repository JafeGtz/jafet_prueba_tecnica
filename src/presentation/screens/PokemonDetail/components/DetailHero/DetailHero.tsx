import React from 'react';
import { View } from 'react-native';
import { PokemonImage } from '@/presentation/components/PokemonImage/PokemonImage';
import { TypeBadge } from '@/presentation/components/TypeBadge/TypeBadge';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { styles } from '@/presentation/screens/PokemonDetail/components/DetailHero/DetailHero.styles';
import type { DetailHeroProps } from '@/presentation/screens/PokemonDetail/components/DetailHero/DetailHero.types';

export const DetailHero = ({ detail }: DetailHeroProps) => (
  <View style={styles.hero}>
    <View style={styles.imageArea}>
      <View
        style={[styles.backdrop, { backgroundColor: detail.accentColor }]}
      />
      <PokemonImage uri={detail.imageUrl} size={LAYOUT.HERO_IMAGE_SIZE} />
    </View>
    <View
      style={styles.types}
      accessible
      accessibilityLabel={detail.typesAccessibilityLabel}
    >
      {detail.types.map(type => (
        <TypeBadge key={type.key} type={type} />
      ))}
    </View>
  </View>
);
