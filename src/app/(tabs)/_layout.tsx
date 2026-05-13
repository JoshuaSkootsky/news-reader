import { Tabs } from 'expo-router';
import { useColorScheme, Text, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backgroundElement,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarLabel: 'Today',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && { borderColor: colors.text, borderWidth: 2, borderRadius: 6 }]}>
              <Text style={[styles.icon, { cursor: 'pointer' }]}>📰</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="latest"
        options={{
          title: 'Latest',
          tabBarLabel: 'Latest',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && { borderColor: colors.text, borderWidth: 2, borderRadius: 6 }]}>
              <Text style={[styles.icon, { cursor: 'pointer' }]}>🕐</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarLabel: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && { borderColor: colors.text, borderWidth: 2, borderRadius: 6 }]}>
              <Text style={[styles.icon, { cursor: 'pointer' }]}>🔖</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
});