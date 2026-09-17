import React, { memo, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { PokemonImage } from '@/presentation/components/PokemonImage/PokemonImage';
import { LAYOUT } from '@/presentation/constants/layout.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { styles } from '@/presentation/screens/PokemonList/components/PokemonCard/PokemonCard.styles';
import type { PokemonCardProps } from '@/presentation/screens/PokemonList/components/PokemonCard/PokemonCard.types';
import { pressableStyle } from '@/presentation/utils/pressableStyle';

const cardStyle = pressableStyle(styles.card, styles.pressed);

const PokemonCardComponent = ({
  pokemon,
  width,
  onPress,
}: PokemonCardProps) => {
  const handlePress = useCallback(() => onPress(pokemon), [onPress, pokemon]);

  return (
    <View style={[styles.cell, { width }]}>
      <Pressable
        onPress={handlePress}
        style={cardStyle}
        accessibilityRole="button"
        accessibilityLabel={pokemon.accessibilityLabel}
        accessibilityHint={STRINGS.pokemonList.cardHint}
      >
        <PokemonImage uri={pokemon.imageUrl} size={LAYOUT.CARD_IMAGE_SIZE} />
        <Text style={styles.number}>{pokemon.number}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {pokemon.name}
        </Text>
      </Pressable>
    </View>
  );
};

export const PokemonCard = memo(PokemonCardComponent);
