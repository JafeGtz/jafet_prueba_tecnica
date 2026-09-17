import React, { type ReactElement } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PrimaryButton } from '@/presentation/components/PrimaryButton/PrimaryButton';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { ListFooterStatus } from '@/presentation/enums/ListFooterStatus';
import { styles } from '@/presentation/screens/PokemonList/components/PokemonListFooter/PokemonListFooter.styles';
import type { PokemonListFooterProps } from '@/presentation/screens/PokemonList/components/PokemonListFooter/PokemonListFooter.types';
import { colors } from '@/presentation/theme';

export const PokemonListFooter = ({
  status,
  onRetry,
}: PokemonListFooterProps) => {
  const content: Record<ListFooterStatus, ReactElement | null> = {
    [ListFooterStatus.Idle]: null,
    [ListFooterStatus.Loading]: (
      <ActivityIndicator
        color={colors.primary}
        accessibilityLabel={STRINGS.pokemonList.loadingLabel}
      />
    ),
    [ListFooterStatus.Error]: (
      <View style={styles.error}>
        <Text style={styles.errorText}>
          {STRINGS.pokemonList.loadMoreError}
        </Text>
        <PrimaryButton label={STRINGS.common.retry} onPress={onRetry} />
      </View>
    ),
  };

  return <View style={styles.container}>{content[status]}</View>;
};
