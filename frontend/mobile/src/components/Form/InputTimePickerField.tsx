import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../theme/themeContext';

interface Props {
  label: string;
  icon?: string;
  value?: string;
  placeholder?: string;
  onChange?: (time: string) => void;
  editable?: boolean;
}

export function TimePickerField({
  label,
  icon,
  value,
  placeholder = 'Selecione o horário',
  onChange,
  editable = true,
}: Props) {
  const { theme } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || '');

  const handlePress = () => {
    if (editable) setShowPicker(true);
  };

  // 🔹 Corrigido: tipagem segura para Android e iOS
  const handleChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false); // Android fecha automaticamente
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formatted = `${hours}:${minutes}`;
      setSelectedTime(formatted);
      onChange?.(formatted);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        {icon && <MaterialCommunityIcons name={icon} size={theme.sizes.mediumText.fontSize} color={theme.colors.detail} />}
        <Text
          style={{
            marginLeft: icon ? 6 : 0,
            color: theme.colors.detail,
            fontSize: theme.sizes.mediumText.fontSize,
          }}
        >
          {label}
        </Text>
      </View>

      <Pressable onPress={handlePress}>
        <TextInput
          value={selectedTime}
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          style={{
            borderWidth: 1,
            borderColor: theme.colors.detail,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: theme.sizes.mediumText.fontSize,
            backgroundColor: theme.colors.backgroundCard,
            color: theme.colors.text,
          }}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleChange} 
        />
      )}
    </View>
  );
}
