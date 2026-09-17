import React, { type PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '@/presentation/components/SafeAreaContainer/SafeAreaContainer.styles';

export const SafeAreaContainer = ({ children }: PropsWithChildren) => (
  <SafeAreaView style={styles.container}>{children}</SafeAreaView>
);
