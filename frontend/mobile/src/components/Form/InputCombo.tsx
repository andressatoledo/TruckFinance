import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  LayoutRectangle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/themeContext';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  value?: T;
  options: Option<T>[];
  loading?: boolean;
  onChange: (value: T) => void;
  icon?: string;
  disabled?: boolean;
};

export function InputCombo<T extends string>({
  label,
  value,
  options,
  onChange,
  icon,
  disabled,
}: Props<T>) {
  const ref = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const { theme } = useTheme();

  const open = () => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setLayout({ x, y, width, height });
        setVisible(true);
      });
    }
  };

  const close = () => setVisible(false);

  return (
    <>
      <View ref={ref} style={{ marginBottom: 16 }}>
        <Text style={{ color: theme.colors.detail,  marginBottom: 6 , fontSize: theme.sizes.mediumText.fontSize }}>{label}</Text>

        <TouchableOpacity
          onPress={open}
          disabled={disabled}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.backgroundCard,
            borderColor: disabled ? theme.colors.opaco : theme.colors.detail,
            
          }}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color= {theme.colors.destaque}
            />
          )}

          <Text style={{ flex: 1, fontSize: theme.sizes.mediumText.fontSize, marginLeft: icon ? 8 : 0, color: disabled ? theme.colors.opaco : theme.colors.destaque }}>
            {value
              ? options.find(o => o.value === value)?.label
              : 'Selecione'}
          </Text>

          <MaterialCommunityIcons name="chevron-down" size={20} style={{ color: disabled ? theme.colors.opaco : theme.colors.destaque }} />
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={close}
        >
          {layout && (
            <View
              style={{
                position: 'absolute',
                top: layout.y + layout.height + 4,
                left: layout.x,
                width: layout.width,
                backgroundColor: theme.colors.backgroundCard,
                borderRadius: 8,
                elevation: 5,
                maxHeight: 200,
              }}
            >
              <FlatList
                data={options}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item.value);
                      close();
                    }}
                    style={{ padding: 12 }}
                  >
                    <Text style={{ color: theme.colors.text , fontSize: theme.sizes.mediumText.fontSize}}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </>
  );
}
