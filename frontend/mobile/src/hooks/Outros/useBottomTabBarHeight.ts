import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export function useOptionalTabBarHeight() {
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
}