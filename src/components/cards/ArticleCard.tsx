import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Article } from '@/types/article';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
  onPress?: (id: string) => void;
}

function ArticleCardComponent({ article, variant = 'default' }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.id}`} asChild>
        <Pressable style={styles.compactContainer}>
          <View style={styles.compactContent}>
            <ThemedText type="bodySmall" style={styles.compactTitle} numberOfLines={2}>
              {article.title}
            </ThemedText>
            <View style={styles.compactMeta}>
              <ThemedText type="small" style={styles.metaText}>
                {article.author}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {' · '}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {formattedDate}
              </ThemedText>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textContent}>
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
            <ThemedText type="body" style={styles.title} numberOfLines={2}>
              {article.title}
            </ThemedText>
            <ThemedText type="bodySmall" style={styles.excerpt} numberOfLines={2}>
              {article.excerpt}
            </ThemedText>
            <View style={styles.meta}>
              <ThemedText type="small" style={styles.metaText}>
                {article.author}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {' · '}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {formattedDate}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {' · '}
              </ThemedText>
              <ThemedText type="small" style={styles.metaText}>
                {article.readingTime} min
              </ThemedText>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: article.imageUrl }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  textContent: {
    flex: 1,
    gap: Spacing.one,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  premiumBadge: {
    backgroundColor: '#FB8C00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  title: {
    fontWeight: '600',
    lineHeight: 22,
  },
  excerpt: {
    opacity: 0.7,
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  metaText: {
    opacity: 0.6,
    fontSize: 12,
  },
  imageContainer: {
    width: 100,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  compactContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  compactContent: {
    gap: Spacing.one,
  },
  compactTitle: {
    fontWeight: '600',
    lineHeight: 20,
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const ArticleCard = memo(ArticleCardComponent);