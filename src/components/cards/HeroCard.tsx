import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Article } from '@/types/article';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface HeroCardProps {
  article: Article;
}

function HeroCardComponent({ article }: HeroCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/article/${article.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.overlay} />
        </View>
        <ThemedView style={styles.content}>
          <View style={styles.categoryBadge}>
            <ThemedText style={styles.categoryText}>
              {article.category.toUpperCase()}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.title} numberOfLines={2}>
            {article.title}
          </ThemedText>
          <ThemedText type="bodySmall" style={styles.excerpt} numberOfLines={2}>
            {article.excerpt}
          </ThemedText>
          <View style={styles.meta}>
            <ThemedText type="small">{article.author}</ThemedText>
            <ThemedText type="small"> · </ThemedText>
            <ThemedText type="small">{formattedDate}</ThemedText>
            <ThemedText type="small"> · </ThemedText>
            <ThemedText type="small">{article.readingTime} min read</ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.three,
    marginVertical: Spacing.two,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  imageContainer: {
    height: 240,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'transparent',
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    backgroundColor: '#E53935',
    borderRadius: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  excerpt: {
    opacity: 0.8,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.one,
    opacity: 0.7,
  },
});

export const HeroCard = memo(HeroCardComponent);