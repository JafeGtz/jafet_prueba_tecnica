import React from 'react';
import { StatusBar } from 'react-native';
import { SCREEN_REGISTRY } from '@/app/config/screenRegistry';
import { AppProviders } from '@/app/providers/AppProviders';
import { OfflineBanner } from '@/presentation/components/OfflineBanner/OfflineBanner';
import { SafeAreaContainer } from '@/presentation/components/SafeAreaContainer/SafeAreaContainer';
import { Route } from '@/presentation/enums/Route';
import { StackNavigator } from '@/presentation/navigation/StackNavigator/StackNavigator';

export const App = () => (
  <AppProviders>
    <StatusBar barStyle="dark-content" />
    <SafeAreaContainer>
      <OfflineBanner />
      <StackNavigator
        initialRoute={Route.PokemonList}
        screens={SCREEN_REGISTRY}
      />
    </SafeAreaContainer>
  </AppProviders>
);
