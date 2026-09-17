import React from 'react';
import { Animated, Text, View } from 'react-native';
import { useProgressAnimation } from '@/presentation/hooks/useProgressAnimation';
import { styles } from '@/presentation/screens/PokemonDetail/components/StatBar/StatBar.styles';
import type { StatBarProps } from '@/presentation/screens/PokemonDetail/components/StatBar/StatBar.types';

export const StatBar = ({ stat, color }: StatBarProps) => {
  const width = useProgressAnimation(stat.ratio);

  return (
    <View
      style={styles.row}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={stat.accessibilityLabel}
      accessibilityValue={{ min: 0, max: stat.maxValue, now: stat.value }}
    >
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>{stat.value}</Text>
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { width, backgroundColor: color }]}
        />
      </View>
    </View>
  );
};
