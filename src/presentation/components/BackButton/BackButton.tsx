import React from 'react';
import { Pressable, View } from 'react-native';
import { styles } from '@/presentation/components/BackButton/BackButton.styles';
import type { BackButtonProps } from '@/presentation/components/BackButton/BackButton.types';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { spacing } from '@/presentation/theme';
import { pressableStyle } from '@/presentation/utils/pressableStyle';

const buttonStyle = pressableStyle(styles.button, styles.pressed);

export const BackButton = ({ onPress }: BackButtonProps) => (
  <Pressable
    onPress={onPress}
    style={buttonStyle}
    hitSlop={spacing.sm}
    accessibilityRole="button"
    accessibilityLabel={STRINGS.common.back}
    accessibilityHint={STRINGS.common.backHint}
  >
    <View style={styles.chevron} />
  </Pressable>
);
