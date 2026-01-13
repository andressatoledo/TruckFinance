import { View } from 'react-native';

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {children}
    </View>
  );
}
