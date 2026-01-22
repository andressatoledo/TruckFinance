import { Pressable, Animated } from 'react-native';
import { useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onPress: () => void;
}

export function ArrowButton({ direction, onPress }: ArrowButtonProps) {
  const { theme } = useTheme();

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  function animateIn() {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: direction === 'left' ? -4 : 4,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function animateOut() {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  }

  return (
    <Pressable onPressIn={animateIn} onPressOut={animateOut}>
      <Animated.View
        style={{
          transform: [{ scale }, { translateX }]
        }}
      >
        <MaterialCommunityIcons
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={32}
          color={theme.colors.detail}
        />
      </Animated.View>
    </Pressable>
  );
}
