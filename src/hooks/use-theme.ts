import { Colors, ThemeColor } from '@/constants/theme';
import { useColorScheme } from './use-color-scheme';

export function useTheme(): Record<ThemeColor, string> {
  const scheme = useColorScheme();
  return Colors[scheme];
}