import React from 'react';
import { Text, View } from 'react-native';
import {
  chipVariantStyles,
  labelVariantStyles,
  styles,
} from '@/presentation/screens/PokemonDetail/components/AbilityChip/AbilityChip.styles';
import type { AbilityChipProps } from '@/presentation/screens/PokemonDetail/components/AbilityChip/AbilityChip.types';

export const AbilityChip = ({ ability }: AbilityChipProps) => (
  <View style={[styles.chip, chipVariantStyles[ability.variant]]}>
    <Text style={[styles.label, labelVariantStyles[ability.variant]]}>
      {ability.label}
    </Text>
  </View>
);
