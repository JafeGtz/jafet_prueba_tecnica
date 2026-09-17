import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/presentation/screens/PokemonDetail/components/MeasurementItem/MeasurementItem.styles';
import type { MeasurementItemProps } from '@/presentation/screens/PokemonDetail/components/MeasurementItem/MeasurementItem.types';

export const MeasurementItem = ({ measurement }: MeasurementItemProps) => (
  <View
    style={styles.item}
    accessible
    accessibilityLabel={`${measurement.label}: ${measurement.value}`}
  >
    <Text style={styles.value}>{measurement.value}</Text>
    <Text style={styles.label}>{measurement.label}</Text>
  </View>
);
