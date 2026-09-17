import React from 'react';
import { Animated, Text } from 'react-native';
import { styles } from '@/presentation/components/OfflineBanner/OfflineBanner.styles';
import { useOfflineBanner } from '@/presentation/components/OfflineBanner/useOfflineBanner';
import { TEXT_SCALE } from '@/presentation/constants/layout.constants';

export const OfflineBanner = () => {
  const { animatedStyle, isVisible, message } = useOfflineBanner();

  return (
    <Animated.View
      style={[styles.banner, animatedStyle]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityElementsHidden={!isVisible}
    >
      <Text
        style={styles.message}
        numberOfLines={1}
        maxFontSizeMultiplier={TEXT_SCALE.COMPACT_MAX}
      >
        {message}
      </Text>
    </Animated.View>
  );
};
