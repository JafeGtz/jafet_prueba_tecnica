import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/presentation/screens/PokemonDetail/components/DetailSection/DetailSection.styles';
import type { DetailSectionProps } from '@/presentation/screens/PokemonDetail/components/DetailSection/DetailSection.types';

export const DetailSection = ({ title, children }: DetailSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.title} accessibilityRole="header">
      {title}
    </Text>
    {children}
  </View>
);
