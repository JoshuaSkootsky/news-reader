import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/cards/ArticleCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getLatestArticles, Article } from '@/services/mockData';

export default function LatestScreen() {
  const articles = getLatestArticles();

  const keyExtractor = useCallback((item: Article) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Article }) => <ArticleCard article={item} />,
    []
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Latest
          </ThemedText>
          <ThemedText type="bodySmall" style={styles.headerSubtitle}>
            Recent stories from all sections
          </ThemedText>
        </View>

        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: Spacing.one,
    opacity: 0.6,
  },
  listContent: {
    paddingBottom: Spacing.six,
  },
});