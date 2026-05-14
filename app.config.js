const IS_DEV = process.env.APP_ENV === 'development';
const IS_PREVIEW = process.env.APP_ENV === 'preview';
const channel = process.env.EAS_BUILD_CHANNEL || 'development';

module.exports = {
  expo: {
    name: IS_DEV ? 'my-app (Dev)' : IS_PREVIEW ? 'my-app (Preview)' : 'my-app',
    slug: 'my-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      icon: './assets/expo.icon',
      bundleIdentifier: IS_DEV ? 'com.jskootsky.app.dev' : IS_PREVIEW ? 'com.jskootsky.app.preview' : 'com.jskootsky.app',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      predictiveBackGestureEnabled: false,
      package: IS_DEV ? 'com.jskootsky.app.dev' : IS_PREVIEW ? 'com.jskootsky.app.preview' : 'com.jskootsky.app',
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#208AEF',
          android: {
            image: './assets/images/splash-icon.png',
            imageWidth: 76,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
      basePath: process.env.GITHUB_PAGES ? '/news-reader' : '',
    },
    runtimeVersion: {
      policy: 'fingerprint',
    },
    updates: {
      url: 'https://u.expo.dev/dfb18605-d1c6-4a7d-97ba-28f6104490ef',
      enableBsdiffPatchSupport: true,
      checkAutomatically: 'ON_LOAD',
    },
    hooks: {
      postPublish: [
        {
          file: 'expo-updates/hooks/post-publish',
          config: {
            resetCache: true,
          },
        },
      ],
    },
    extra: {
      router: {},
      eas: {
        projectId: "63881f67-8bdc-473e-a38e-6764c4922ac2"
      },
    },
    owner: 'jskootsky',
    buildCacheProvider: 'eas',
  },
};