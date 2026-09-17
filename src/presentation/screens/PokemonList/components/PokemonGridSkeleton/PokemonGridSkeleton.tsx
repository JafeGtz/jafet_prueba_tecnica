import React from 'react';
import { Animated, View } from 'react-native';
import { SkeletonBlock } from '@/presentation/components/SkeletonBlock/SkeletonBlock';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { usePulseAnimation } from '@/presentation/hooks/usePulseAnimation';
import { styles } from '@/presentation/screens/PokemonList/components/PokemonGridSkeleton/PokemonGridSkeleton.styles';
import type { PokemonGridSkeletonProps } from '@/presentation/screens/PokemonList/components/PokemonGridSkeleton/PokemonGridSkeleton.types';
import { createKeys } from '@/presentation/utils/createKeys';

const SKELETON_CARDS = createKeys('card', LAYOUT.SKELETON_CARD_COUNT);

export const PokemonGridSkeleton = ({ grid }: PokemonGridSkeletonProps) => {
  const opacity = usePulseAnimation();

  return (
    <Animated.View
      style={[styles.grid, { opacity }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={STRINGS.pokemonList.loadingLabel}
    >
      {SKELETON_CARDS.map(key => (
        <View key={key} style={[styles.cell, { width: grid.itemWidth }]}>
          <View style={styles.card}>
            <SkeletonBlock style={styles.image} />
            <SkeletonBlock style={styles.number} />
            <SkeletonBlock style={styles.name} />
          </View>
        </View>
      ))}
    </Animated.View>
  );
};
