import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Article } from '@/types/article';
import { getArticleById } from '@/services/mockData';
import { useBookmarkStore } from '@/stores/bookmarkStore';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();

  useEffect(() => {
    if (id) {
      const found = getArticleById(id);
      if (found) setArticle(found);
    }
  }, [id]);

  if (!article) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <ThemedText>Article not found</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const bookmarked = isBookmarked(article.id);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        </View>

        <ThemedView style={styles.content}>
          <View style={styles.categoryRow}>
            <ThemedText style={styles.category}>
              {article.category.toUpperCase()}
            </ThemedText>
            {article.isPremium && (
              <ThemedView style={styles.premiumBadge}>
                <ThemedText style={styles.premiumText}>PREMIUM</ThemedText>
              </ThemedView>
            )}
          </View>

          <ThemedText type="title" style={styles.title}>
            {article.title}
          </ThemedText>

          <ThemedText type="body" style={styles.excerpt}>
            {article.excerpt}
          </ThemedText>

          <View style={styles.meta}>
            <View style={styles.authorRow}>
              {article.authorImage && (
                <Image
                  source={{ uri: article.authorImage }}
                  style={styles.authorImage}
                />
              )}
              <View>
                <ThemedText type="bodySmall" style={styles.authorName}>
                  {article.author}
                </ThemedText>
                <ThemedText type="small" style={styles.metaText}>
                  {formattedDate} · {article.readingTime} min read
                </ThemedText>
              </View>
            </View>
          </View>

          <Pressable onPress={handleBookmarkToggle} style={styles.bookmarkButton}>
            <ThemedText style={styles.bookmarkIcon}>
              {bookmarked ? '🔖' : '🏷️'}
            </ThemedText>
            <ThemedText style={styles.bookmarkText}>
              {bookmarked ? 'Saved' : 'Save'}
            </ThemedText>
          </Pressable>

          <View style={styles.divider} />

          <ThemedView style={styles.articleBody}>
            <ThemedText type="body" style={styles.bodyText}>
              {article.content.replace(/<[^>]*>/g, '\n\n').replace(/\n\s*\n/g, '\n\n').trim()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 280,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  premiumBadge: {
    backgroundColor: '#FB8C00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  excerpt: {
    fontSize: 17,
    lineHeight: 26,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  meta: {
    marginTop: Spacing.two,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  authorImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorName: {
    fontWeight: '600',
  },
  metaText: {
    opacity: 0.6,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  bookmarkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: Spacing.three,
  },
  articleBody: {
    gap: Spacing.three,
  },
  bodyText: {
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
});