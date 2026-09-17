import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/presentation/components/ScreenHeader/ScreenHeader.styles';
import type { ScreenHeaderProps } from '@/presentation/components/ScreenHeader/ScreenHeader.types';

export const ScreenHeader = ({
  title,
  subtitle,
  leading,
}: ScreenHeaderProps) => (
  <View style={styles.container}>
    {leading}
    <View style={styles.texts}>
      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
  </View>
);
