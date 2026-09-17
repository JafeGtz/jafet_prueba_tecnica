import React from 'react';
import { View } from 'react-native';
import { BackButton } from '@/presentation/components/BackButton/BackButton';
import { QueryStateView } from '@/presentation/components/QueryStateView/QueryStateView';
import { ScreenHeader } from '@/presentation/components/ScreenHeader/ScreenHeader';
import { StateMessage } from '@/presentation/components/StateMessage/StateMessage';
import { STRINGS } from '@/presentation/constants/strings.constants';
import { PokemonDetailContent } from '@/presentation/screens/PokemonDetail/components/PokemonDetailContent/PokemonDetailContent';
import { PokemonDetailSkeleton } from '@/presentation/screens/PokemonDetail/components/PokemonDetailSkeleton/PokemonDetailSkeleton';
import { styles } from '@/presentation/screens/PokemonDetail/PokemonDetailScreen.styles';
import { usePokemonDetailViewModel } from '@/presentation/screens/PokemonDetail/usePokemonDetailViewModel';

export const PokemonDetailScreen = () => {
  const viewModel = usePokemonDetailViewModel();

  const errorMessage = (
    <StateMessage
      title={viewModel.error.title}
      message={viewModel.error.message}
      actionLabel={STRINGS.common.retry}
      onAction={viewModel.retry}
    />
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={viewModel.title}
        subtitle={viewModel.subtitle}
        leading={<BackButton onPress={viewModel.goBack} />}
      />
      <QueryStateView
        status={viewModel.status}
        data={viewModel.detail}
        loading={<PokemonDetailSkeleton />}
        error={errorMessage}
        empty={errorMessage}
        renderContent={detail => <PokemonDetailContent detail={detail} />}
      />
    </View>
  );
};
