import React, { useCallback } from 'react';
import {
  FlatList,
  type ListRenderItemInfo,
  RefreshControl,
  View,
} from 'react-native';
import { QueryStateView } from '@/presentation/components/QueryStateView/QueryStateView';
import { ScreenHeader } from '@/presentation/components/ScreenHeader/ScreenHeader';
import { StateMessage } from '@/presentation/components/StateMessage/StateMessage';
import { LIST_CONFIG } from '@/presentation/constants/layout.constants';
import { STRINGS } from '@/presentation/constants/strings.constants';
import type { PokemonCardViewData } from '@/presentation/models/PokemonCardViewData';
import { PokemonCard } from '@/presentation/screens/PokemonList/components/PokemonCard/PokemonCard';
import { PokemonGridSkeleton } from '@/presentation/screens/PokemonList/components/PokemonGridSkeleton/PokemonGridSkeleton';
import { PokemonListFooter } from '@/presentation/screens/PokemonList/components/PokemonListFooter/PokemonListFooter';
import {
  refreshColors,
  styles,
} from '@/presentation/screens/PokemonList/PokemonListScreen.styles';
import { usePokemonListViewModel } from '@/presentation/screens/PokemonList/usePokemonListViewModel';
import { colors } from '@/presentation/theme';

export const PokemonListScreen = () => {
  const viewModel = usePokemonListViewModel();
  const { grid, selectPokemon } = viewModel;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PokemonCardViewData>) => (
      <PokemonCard
        pokemon={item}
        width={grid.itemWidth}
        onPress={selectPokemon}
      />
    ),
    [grid.itemWidth, selectPokemon],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={STRINGS.pokemonList.title}
        subtitle={STRINGS.pokemonList.subtitle}
      />
      <QueryStateView
        status={viewModel.status}
        data={viewModel.pokemons}
        loading={<PokemonGridSkeleton grid={grid} />}
        error={
          <StateMessage
            title={viewModel.error.title}
            message={viewModel.error.message}
            actionLabel={STRINGS.common.retry}
            onAction={viewModel.retry}
          />
        }
        empty={
          <StateMessage
            title={STRINGS.pokemonList.emptyTitle}
            message={STRINGS.pokemonList.emptyMessage}
            actionLabel={STRINGS.common.retry}
            onAction={viewModel.retry}
          />
        }
        renderContent={pokemons => (
          <FlatList
            key={grid.columns}
            data={pokemons}
            numColumns={grid.columns}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            onEndReached={viewModel.loadMore}
            onEndReachedThreshold={LIST_CONFIG.END_REACHED_THRESHOLD}
            initialNumToRender={LIST_CONFIG.INITIAL_NUM_TO_RENDER}
            maxToRenderPerBatch={LIST_CONFIG.MAX_TO_RENDER_PER_BATCH}
            windowSize={LIST_CONFIG.WINDOW_SIZE}
            refreshControl={
              <RefreshControl
                refreshing={viewModel.isRefreshing}
                onRefresh={viewModel.refresh}
                colors={refreshColors}
                tintColor={colors.primary}
              />
            }
            ListFooterComponent={
              <PokemonListFooter
                status={viewModel.footerStatus}
                onRetry={viewModel.retryLoadMore}
              />
            }
          />
        )}
      />
    </View>
  );
};
