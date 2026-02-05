import { View, Text, TextInput } from 'react-native';
import { FilterFieldConfig } from './types';
import {InputField} from '../Form/InputField'

interface Props {
  field: FilterFieldConfig;
  value: any;
  onChange: (value: any) => void;
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
            onChangeText={(text) => onChange( text)}
            keyboardType="default"
          />
        </View>
      );

    case 'number':
      return (
        <View>
          <Text>{field.label}</Text>
          <TextInput
            keyboardType="numeric"
            value={String(value || '')}
            onChangeText={(v) => onChange(Number(v))}
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
              onChangeText={(v) =>
                onChange({ ...value, min: Number(v) })
              }
            />
            <TextInput
              placeholder="Máximo"
              keyboardType="numeric"
              onChangeText={(v) =>
                onChange({ ...value, max: Number(v) })
              }
            />
          </View>
        </View>
      );

    default:
      return null;
  }
}
