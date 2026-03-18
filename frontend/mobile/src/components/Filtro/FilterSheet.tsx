import { View, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FilterField } from './FilterField';
import { FilterFieldConfig } from './types';
import { SubmitButton } from '../Form/SubmitButton';
import { Button } from '../Form/Button';
import { useTheme } from '../../theme/themeContext';
// import {Form} from '../Form/Form'

import { useEffect } from 'react';

interface FilterSheetProps {
  filters: FilterFieldConfig[];
  filtroAtual: Record<string, any>;
  onApply: (data: Record<string, any>) => void;
  onClear: () => void;
}

export function FilterSheet({
  filters,
  filtroAtual,
  onApply,
  onClear,
}: FilterSheetProps) {
  const { theme } = useTheme();


  const { control, handleSubmit, reset } = useForm({
    defaultValues: filtroAtual,
  });

  function aplicar(data: Record<string, any>) {
    onApply(data);
  }

//   function limpar() {
//   const vazio = {};
//   reset(vazio);
//   onClear();
// }
function limpar() {
  const valoresLimpos = Object.fromEntries(
    filters.map(f => [f.key, ''])
  );

  reset(valoresLimpos);
  onClear();
}

useEffect(() => {
  reset(filtroAtual);
}, [filtroAtual, reset]);

  return (
   
    <ScrollView
    showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  bounces={false}
  contentContainerStyle={{ paddingBottom: 24 , padding: 10}}
  >
      {filters.map((field) => (
        <Controller
          key={field.key}
          control={control}
          name={field.key}
          render={({ field: controllerField }) => (
            <FilterField
              field={field}
              value={controllerField.value}
              onChange={controllerField.onChange}
            />
          )}
        />
      ))}

      
        <View>

          <SubmitButton
            label="Aplicar filtros"
            onPress={handleSubmit(aplicar)}
          />

            <Button
            label="Limpar filtros"
            borderColor={theme.colors.primary}
            onPress={limpar}
          />
        </View>
      </ScrollView>
  );
}
