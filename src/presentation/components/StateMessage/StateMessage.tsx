import React from 'react';
import { Text, View } from 'react-native';
import { Pokeball } from '@/presentation/components/Pokeball/Pokeball';
import { PrimaryButton } from '@/presentation/components/PrimaryButton/PrimaryButton';
import { styles } from '@/presentation/components/StateMessage/StateMessage.styles';
import type { StateMessageProps } from '@/presentation/components/StateMessage/StateMessage.types';
import { LAYOUT } from '@/presentation/constants/layout.constants';

export const StateMessage = ({
  title,
  message,
  actionLabel,
  onAction,
}: StateMessageProps) => (
  <View style={styles.container}>
    <Pokeball size={LAYOUT.STATE_ICON_SIZE} />
    <Text style={styles.title} accessibilityRole="header">
      {title}
    </Text>
    <Text style={styles.message}>{message}</Text>
    <PrimaryButton label={actionLabel} onPress={onAction} />
  </View>
);
