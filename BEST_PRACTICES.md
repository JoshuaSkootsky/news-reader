# React Native Best Practices Guide

A comprehensive guide for building high-performance, maintainable React Native applications.

---

## Table of Contents

1. [Performance](#performance)
2. [State Management](#state-management)
3. [Component Architecture](#component-architecture)
4. [Navigation](#navigation)
5. [Styling & Theming](#styling--theming)
6. [Data & Networking](#data--networking)
7. [Security](#security)
8. [Testing](#testing)
9. [Build & Deployment](#build--deployment)
10. [Platform Considerations](#platform-considerations)

---

## Performance

### FlatList Optimization

FlatList is essential for any scrollable list. Never use ScrollView for long lists.

```tsx
// Good: FlatList with performance props
<FlatList
  data={articles}
  renderItem={({ item }) => <ArticleCard article={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}        // Render first 10 immediately
  maxToRenderPerBatch={10}      // Render 10 per JS frame
  windowSize={5}                 // Keep 5 screens worth in memory
  removeClippedSubviews={true}  // Unmount items far offscreen
  getItemLayout={(_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}                           // Skip layout calculations (fixed heights only)
/>
```

**When NOT to use FlatList:**
- Static lists under 20 items → Use ScrollView
- Grouped sections → Use SectionList
- Complex grids → Use FlashList (@shopify/flash-list)

### Memoization

Prevent unnecessary re-renders with React.memo and useCallback:

```tsx
// Memoize list items
const ArticleCard = React.memo(({ article, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* ... */}
    </TouchableOpacity>
  );
});

// Stable callback references
const handlePress = useCallback((id: string) => {
  router.push(`/article/${id}`);
}, [router]);
```

### Image Optimization

- Always specify width/height to prevent layout shifts
- Use expo-image or react-native-fast-image for caching
- Implement progressive loading for remote images

```tsx
// Good
<Image
  source={{ uri: article.imageUrl }}
  style={styles.image}
  contentFit="cover"
  transition={200}
/>
```

### Avoid Anonymous Functions in Render

```tsx
// Bad - creates new function on every render
<Button onPress={() => handlePress(item.id)} />

// Good - stable reference
<Button onPress={handlePress} id={item.id} />
// Inside Button: onPress={() => onPress(id)}
```

---

## State Management

### Server State: TanStack Query

For data fetching, caching, and background updates:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['articles'],
  queryFn: fetchArticles,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 3,
});
```

### Client State: Zustand

Lightweight state management (simpler than Redux):

```tsx
// store/bookmarkStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookmarkState {
  bookmarkIds: string[];
  addBookmark: (id: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkIds: [],

  addBookmark: async (id: string) => {
    const newIds = [...get().bookmarkIds, id];
    set({ bookmarkIds: newIds });
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newIds));
  },

  removeBookmark: async (id: string) => {
    const newIds = get().bookmarkIds.filter(i => i !== id);
    set({ bookmarkIds: newIds });
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newIds));
  },

  isBookmarked: (id: string) => get().bookmarkIds.includes(id),
}));
```

### Custom Hooks Pattern

Keep business logic out of components:

```tsx
// hooks/useArticles.ts
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { articles, isLoading, refetch: loadArticles };
};
```

---

## Component Architecture

### File Organization

```
src/
├── app/                    # Expo Router pages (file-based routing)
│   ├── (tabs)/            # Tab routes
│   └── article/[id].tsx   # Dynamic routes
├── components/
│   ├── cards/             # Card components
│   ├── ui/                # Reusable UI primitives
│   └── layouts/           # Layout components
├── hooks/                 # Custom hooks
├── services/              # API clients, utilities
├── stores/                # Zustand stores
├── types/                 # TypeScript definitions
└── constants/             # Theme, config
```

### Component Patterns

**Presentational Components** - UI only, props in:
```tsx
interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
  variant?: 'default' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
  variant = 'default',
}) => {
  // Render only - no business logic
};
```

**Container Components** - Data fetching, state management:
```tsx
export const ArticleList: React.FC = () => {
  const { articles, isLoading } = useArticles();

  if (isLoading) return <LoadingSpinner />;

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleCard article={item} />}
    />
  );
};
```

### Error Boundaries

Prevent total app crashes:

```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Crashlytics/Sentry
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback}>
          <Text>Something went wrong</Text>
          <Button title="Try Again" onPress={() => this.setState({ hasError: false })} />
        </View>
      );
    }
    return this.props.children;
  }
}
```

---

## Navigation

### Expo Router (Recommended)

File-based routing for universal React Native apps:

```
app/
├── _layout.tsx           # Root layout
├── index.tsx             # Home (/)
├── article/
│   ├── _layout.tsx       # Article stack layout
│   └── [id].tsx          # Dynamic route (/article/123)
└── (tabs)/               # Route group (no URL segment)
  ├── _layout.tsx         # Tab navigator
  ├── index.tsx           # Tab 1 (/)
  └── profile.tsx         # Tab 2 (/profile)
```

### Navigation Best Practices

- Use deep linking configuration early
- Prefer static configuration over dynamic nesting
- Derive UI state from URL params when possible

---

## Styling & Theming

### Theme Configuration

```tsx
// constants/theme.ts
export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    primary: '#E53935',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    primary: '#E53935',
  },
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
} as const;
```

### Platform-Aware Styles

```tsx
const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    ...Platform.select({
      ios: { paddingTop: 50 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});
```

### Tailwind / NativeWind (v5)

```css
/* global.css */
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
@import "nativewind/theme";
```

---

## Data & Networking

### API Client Pattern

```tsx
// services/api.ts
const BASE_URL = 'https://api.example.com';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchArticles(): Promise<Article[]> {
  const response = await fetch(`${BASE_URL}/articles`);

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch articles');
  }

  return response.json();
}
```

### Caching Strategy

- Use TanStack Query for server state
- Implement offline-first for critical data
- Cache images aggressively

---

## Security

### Storage Security

```tsx
// DON'T - Never store sensitive data in AsyncStorage
await AsyncStorage.setItem('token', 'secret_token');

// DO - Use react-native-keychain
import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('user', 'password');
const credentials = await Keychain.getGenericPassword();
```

### Environment Variables

```tsx
// DON'T - Hardcode API keys
const API_KEY = 'sk-123456789';

// DO - Use build config
const API_KEY = Constants.expoConfig?.extra?.apiKey;
```

---

## Testing

### Unit Testing

```tsx
// __tests__/ArticleCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { ArticleCard } from '../components/cards/ArticleCard';

test('renders article title', () => {
  const mockArticle = { id: '1', title: 'Test Article', ... };
  const { getByText } = render(<ArticleCard article={mockArticle} />);

  expect(getByText('Test Article')).toBeTruthy();
});

test('calls onPress when tapped', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <ArticleCard article={mockArticle} onPress={onPress} />
  );

  fireEvent.press(getByText('Test Article'));
  expect(onPress).toHaveBeenCalled();
});
```

### E2E Testing with Maestro

```yaml
# .maestro/test-flow.yaml
appId: com.example.app
---
- runFlow:
    file: onboarding.yaml
- tapOn: "Read Article"
- assertVisible: "Article Title"
- scroll
- assertVisible: "Share"
```

---

## Build & Deployment

### EAS Build Configuration

```json
// eas.json
{
  "build": {
    "production": {
      "channel": "production",
      "autoIncrement": true,
      "cache": {
        "key": "lockfiles",
        "paths": ["node_modules"]
      }
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### EAS Update for OTA

```bash
# Create a build first
eas build --platform ios --profile preview

# Publish updates
eas update --branch preview --message "Bug fix"
```

### Bundle Analysis

```bash
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ios/main.jsbundle \
  --assets-dest ios

npx source-map-explorer ios/main.jsbundle
```

---

## Platform Considerations

### iOS

- Handle notch/safe areas with react-native-safe-area-context
- Respect Dark Mode with useColorScheme()
- Test on various device sizes (SE to Pro Max)

### Android

- Handle hardware back button with BackHandler
- Test on multiple screen densities
- Use android_ripple for touch feedback

---

## Quick Reference Checklist

### Before Production

- [ ] FlatList with performance props for all scrollable lists
- [ ] React.memo on list items
- [ ] useCallback for event handlers
- [ ] TypeScript strict mode
- [ ] Error boundaries at screen level
- [ ] Dark mode support
- [ ] Proper error handling for API calls
- [ ] Safe area handling
- [ ] Bundle analysis run

### Performance

- [ ] Profile before optimizing (use PerformanceMonitor)
- [ ] Use Hermes engine
- [ ] Implement proper image caching
- [ ] Lazy load heavy modules

### Security

- [ ] No sensitive data in AsyncStorage
- [ ] API keys in environment variables
- [ ] Certificate pinning for production

---

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [NativeWind](https://www.nativewind.dev)
- [TanStack Query](https://tanstack.com/query)
- [FlashList](https://shopify.github.io/flash-list)
- [Expo Router](https://expo.github.io/router)

---

*Last updated: 2026*