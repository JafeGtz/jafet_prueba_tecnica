import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '@/presentation/components/PrimaryButton/PrimaryButton.styles';
import type { PrimaryButtonProps } from '@/presentation/components/PrimaryButton/PrimaryButton.types';
import { pressableStyle } from '@/presentation/utils/pressableStyle';

const buttonStyle = pressableStyle(styles.button, styles.pressed);

export const PrimaryButton = ({ label, onPress }: PrimaryButtonProps) => (
  <Pressable
    onPress={onPress}
    style={buttonStyle}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);
