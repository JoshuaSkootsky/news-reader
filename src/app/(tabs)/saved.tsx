import { useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/cards/ArticleCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import { Article } from '@/types/article';

export default function SavedScreen() {
  const { loadBookmarks, getBookmarkedArticles } = useBookmarkStore();

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const articles = getBookmarkedArticles();

  const keyExtractor = useCallback((item: Article) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Article }) => <ArticleCard article={item} variant="compact" />,
    []
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <ThemedText style={styles.emptyIcon}>🔖</ThemedText>
        <ThemedText type="title" style={styles.emptyTitle}>
          No Saved Articles
        </ThemedText>
        <ThemedText type="bodySmall" style={styles.emptyText}>
          Articles you save will appear here for easy access later.
        </ThemedText>
      </View>
    ),
    []
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Saved
          </ThemedText>
          <ThemedText type="bodySmall" style={styles.headerSubtitle}>
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} saved
          </ThemedText>
        </View>

        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={articles.length === 0 ? styles.emptyList : styles.listContent}
          ListEmptyComponent={renderEmpty}
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
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.six * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.four,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 22,
  },
});