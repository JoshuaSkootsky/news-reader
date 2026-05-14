# My App

A React Native app built with [Expo](https://expo.dev) and [expo-router](https://docs.expo.dev/router/).

## Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)
- For native builds: Xcode (iOS), Android Studio (Android)

## Setup

```bash
# Install dependencies
pnpm install

# Configure EAS (for builds)
eas build:configure
```

## Running Locally

```bash
# Start development server with options
pnpm start

# Force a specific platform
pnpm android    # Android emulator/device
pnpm ios        # iOS simulator/device
pnpm web        # Web browser
```

## Building

### EAS Build (Cloud builds)

```bash
# Development builds (internal distribution)
pnpm build:dev:ios         # iOS development build
pnpm build:dev:android     # Android development build (APK)

# Preview builds
pnpm build:preview         # Android preview (APK)

# Production builds
pnpm build:prod            # Both platforms (app-bundle for Android)

# OTA updates (no binary rebuild)
pnpm update:prod           # Push to production channel
```

### Manual EAS commands

```bash
# Configure once
eas build:configure

# Build for specific platform
eas build --profile development --platform android
eas build --profile development --platform ios
eas build --profile preview --platform android
eas build --profile production --platform all

# Push updates without rebuilding
eas update --channel production
```

### Local Native Builds

```bash
# Run directly on connected device/emulator
pnpm expo run:android
pnpm expo run:ios
```

## Web Support

[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)](https://joshuaskootsky.github.io/news-reader/)

This app supports web builds with PWA capabilities.

```bash
# Run web locally
pnpm web
# or
pnpm expo start --web

# Build web for production
npx expo export --platform web
```

The web build outputs to `dist/` and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Web Features
- PWA support (offline, installable)
- Responsive design
- SEO optimized with expo-router

### Deploy Web

```bash
# Export web bundle
npx expo export --platform web

# Deploy dist/ folder to your preferred host
```

### GitHub Pages Caveats

> **Note:** GitHub Pages serves a static site, so client-side routing (deep links like `/article/123`) will return a 404. The app's root URL works fine, but deep navigation requires a custom server or a host that supports SPA routing (Vercel, Netlify, etc.).

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `APP_ENV` | `development`, `preview`, `production` | Build environment |
| `EXPO_USE_HERMES` | `1` | Use Hermes JS engine |

## Development

```bash
# Lint
pnpm lint

# TypeScript check
pnpm tsc --noEmit
```

## Project Structure

```
app/                    # expo-router pages (file-based routing)
  (tabs)/              # Tab layout with Today, Latest, Saved tabs
  article/[id].tsx     # Article detail page
src/
  components/          # Reusable UI components
  services/            # API/data services
  store/               # Zustand state management
  constants/           # Theme, constants
```

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [expo-router docs](https://docs.expo.dev/router/introduction/)
- [EAS Build docs](https://docs.expo.dev/build/introduction/)