import React from 'react';
import { Animated, View } from 'react-native';
import { SkeletonBlock } from '@/presentation/components/SkeletonBlock/SkeletonBlock';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { usePulseAnimation } from '@/presentation/hooks/usePulseAnimation';
import { styles } from '@/presentation/screens/PokemonDetail/components/PokemonDetailSkeleton/PokemonDetailSkeleton.styles';
import { createKeys } from '@/presentation/utils/createKeys';

const SKELETON_LINES = createKeys('stat', LAYOUT.SKELETON_STAT_COUNT);

export const PokemonDetailSkeleton = () => {
  const opacity = usePulseAnimation();

  return (
    <Animated.View
      style={[styles.container, { opacity }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={STRINGS.pokemonDetail.loadingLabel}
    >
      <View style={styles.hero}>
        <SkeletonBlock style={styles.image} />
        <SkeletonBlock style={styles.badge} />
      </View>
      <View style={styles.section}>
        <SkeletonBlock style={styles.title} />
        {SKELETON_LINES.map(key => (
          <SkeletonBlock key={key} style={styles.line} />
        ))}
      </View>
    </Animated.View>
  );
};
