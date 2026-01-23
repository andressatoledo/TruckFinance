import React, { PropsWithChildren, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { useMemo } from 'react';

const { height } = Dimensions.get('window');


// const { height } = Dimensions.get('window');

type Props = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  heightPercent?: number;
  backgroundColor?: string;
}>;

export function FakeBottomSheet({
  visible,
  onClose,
  children,
  heightPercent = 0.75,
  backgroundColor = '#1E1E1E',
}: Props) {
  const sheetHeight = useMemo(
    () => height * heightPercent,
    [heightPercent]
  );

  const translateY = useRef(
    new Animated.Value(sheetHeight)
  ).current;

  useEffect(() => {
  Animated.timing(translateY, {
    toValue: visible ? 0 : sheetHeight,
    duration: 280,
    useNativeDriver: true,
  }).start();
}, [visible, sheetHeight, translateY]);


  return (
  <View
    style={[
      StyleSheet.absoluteFill,
      { zIndex: 9999, elevation: 9999 }, // 👈 CRÍTICO
    ]}
    pointerEvents={visible ? 'auto' : 'none'}
  >
    <Pressable
      style={styles.backdrop}
      onPress={onClose}
    />

    <Animated.View
      style={[
        styles.sheet,
        {
          height: sheetHeight,
          backgroundColor,
          transform: [{ translateY }],
          zIndex: 10000,
          elevation: 10000,
        },
      ]}
    >
      <View style={styles.handle} />
      {children}
    </Animated.View>
  </View>
);

}



const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    elevation: 20, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#777',
    alignSelf: 'center',
    marginBottom: 12,
  },
});
