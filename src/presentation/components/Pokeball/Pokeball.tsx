import React from 'react';
import { View } from 'react-native';
import { styles } from '@/presentation/components/Pokeball/Pokeball.styles';
import type { PokeballProps } from '@/presentation/components/Pokeball/Pokeball.types';
import { usePokeballStyles } from '@/presentation/components/Pokeball/usePokeballStyles';

export const Pokeball = ({ size }: PokeballProps) => {
  const sizeStyles = usePokeballStyles(size);

  return (
    <View
      style={[styles.ball, sizeStyles.ball]}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.upperHalf} />
      <View style={[styles.band, sizeStyles.band]} />
      <View style={[styles.button, sizeStyles.button]} />
    </View>
  );
};
