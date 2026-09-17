import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/presentation/components/TypeBadge/TypeBadge.styles';
import type { TypeBadgeProps } from '@/presentation/components/TypeBadge/TypeBadge.types';

export const TypeBadge = ({ type }: TypeBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: type.colors.background }]}>
    <Text style={[styles.label, { color: type.colors.foreground }]}>
      {type.label}
    </Text>
  </View>
);
