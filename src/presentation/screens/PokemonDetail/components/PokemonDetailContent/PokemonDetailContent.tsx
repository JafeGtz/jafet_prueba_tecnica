import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { AbilityChip } from '@/presentation/screens/PokemonDetail/components/AbilityChip/AbilityChip';
import { DetailHero } from '@/presentation/screens/PokemonDetail/components/DetailHero/DetailHero';
import { DetailSection } from '@/presentation/screens/PokemonDetail/components/DetailSection/DetailSection';
import { MeasurementItem } from '@/presentation/screens/PokemonDetail/components/MeasurementItem/MeasurementItem';
import { styles } from '@/presentation/screens/PokemonDetail/components/PokemonDetailContent/PokemonDetailContent.styles';
import type { PokemonDetailContentProps } from '@/presentation/screens/PokemonDetail/components/PokemonDetailContent/PokemonDetailContent.types';
import { StatBar } from '@/presentation/screens/PokemonDetail/components/StatBar/StatBar';

const { pokemonDetail: TEXTS } = STRINGS;

export const PokemonDetailContent = ({ detail }: PokemonDetailContentProps) => (
  <ScrollView contentContainerStyle={styles.content}>
    <DetailHero detail={detail} />

    <DetailSection title={TEXTS.measurementsTitle}>
      <View style={styles.measurements}>
        {detail.measurements.map(measurement => (
          <MeasurementItem key={measurement.key} measurement={measurement} />
        ))}
      </View>
    </DetailSection>

    <DetailSection title={TEXTS.abilitiesTitle}>
      <View style={styles.abilities}>
        {detail.abilities.map(ability => (
          <AbilityChip key={ability.key} ability={ability} />
        ))}
      </View>
    </DetailSection>

    <DetailSection title={TEXTS.statsTitle}>
      {detail.stats.map(stat => (
        <StatBar key={stat.key} stat={stat} color={detail.accentColor} />
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{TEXTS.total}</Text>
        <Text style={styles.totalValue}>{detail.totalStats}</Text>
      </View>
    </DetailSection>
  </ScrollView>
);
