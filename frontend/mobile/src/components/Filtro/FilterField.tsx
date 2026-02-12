import { View, Text, TextInput } from 'react-native';
import { FilterFieldConfig } from './types';
import { InputField } from '../Form/InputField';
import { InputCombo } from '../Form/InputCombo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

interface Props {
  field: FilterFieldConfig;
  value: any;
  onChange: (value: any) => void;
}

function DateFilterField({ field, value, onChange }: Props) {
  const [showDate, setShowDate] = useState(false);

  function formatDate(date?: Date) {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <View>
      <InputField
        label={field.label}
        icon={field.icon ?? 'calendar'}
        placeholder={field.placeholder ?? 'Selecione a data'}
        value={formatDate(value)}
        editable={false}
        onPress={() => setShowDate(true)}
      />

      {showDate && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          onChange={(_, selectedDate) => {
            setShowDate(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

export function FilterField({ field, value, onChange }: Props) {
  switch (field.type) {
    case 'text':
      return (
        <View>
          <InputField
            icon={field.icon}
            label={field.label}
            placeholder={field.placeholder}
            value={value ?? ''}
            onChangeText={text => onChange(text)}
            keyboardType="default"
          />
        </View>
      );

    case 'number':
      return (
        <View>
          <InputField
            label={field.label}
            icon={field.icon}
            placeholder={field.placeholder}
            keyboardType="numeric"
            value={String(value || '')}
            onChangeText={v => onChange(Number(v))}
          />
        </View>
      );

    case 'date':
      return (
        <DateFilterField field={field} value={value} onChange={onChange} />
      );
    case 'combo':
      return (
        <View>
          <InputCombo
            label={field.label}
            icon={field.icon}
            value={String(value || '')}
            onChange={v => onChange(Number(v))}
            options={field.options ?? []}
          />
        </View>
      );

    case 'range':
      return (
        <View>
          <Text>{field.label}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              placeholder="Mínimo"
              keyboardType="numeric"
              onChangeText={v => onChange({ ...value, min: Number(v) })}
            />
            <TextInput
              placeholder="Máximo"
              keyboardType="numeric"
              onChangeText={v => onChange({ ...value, max: Number(v) })}
            />
          </View>
        </View>
      );

    default:
      return null;
  }
}
