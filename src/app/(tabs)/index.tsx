import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroCard } from '@/components/cards/HeroCard';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { featuredArticle, getLatestArticles } from '@/services/mockData';

export default function TodayScreen() {
  const articles = getLatestArticles().slice(1);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.headerTitle}>
              Today&apos;s Picks
            </ThemedText>
            <ThemedText type="bodySmall" style={styles.headerSubtitle}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </ThemedText>
          </View>

          <HeroCard article={featuredArticle} />

          <View style={styles.sectionHeader}>
            <ThemedText type="title" style={styles.sectionTitle}>
              More Stories
            </ThemedText>
          </View>

          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

          <View style={styles.footer}>
            <ThemedText type="small" style={styles.footerText}>
              You&apos;ve reached the end
            </ThemedText>
          </View>
        </ScrollView>
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
  sectionHeader: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.two,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.six,
    alignItems: 'center',
  },
  footerText: {
    opacity: 0.4,
  },
});