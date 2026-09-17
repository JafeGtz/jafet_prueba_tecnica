import React from 'react';
import { View } from 'react-native';
import { styles } from '@/presentation/components/SkeletonBlock/SkeletonBlock.styles';
import type { SkeletonBlockProps } from '@/presentation/components/SkeletonBlock/SkeletonBlock.types';

export const SkeletonBlock = ({ style }: SkeletonBlockProps) => (
  <View style={[styles.block, style]} />
);
