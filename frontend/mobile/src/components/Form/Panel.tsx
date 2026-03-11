// src/components/Panel.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface PanelProps {
  title: string;

  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function Panel({ title, children, defaultExpanded = false }: PanelProps) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundCard, borderColor: theme.colors.primary },
      ]}
    >
      {/* Header clicável */}
      <Pressable style={styles.header} onPress={toggle}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.text}
        />
      </Pressable>

      {/* Conteúdo expandido */}
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 12,
  },
});
