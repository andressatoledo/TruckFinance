import {View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FilterField } from './FilterField';
import { FilterFieldConfig } from './types';
import { SubmitButton } from '../Form/SubmitButton';
import { Button } from '../Form/Button';
import { useTheme } from '../../theme/themeContext';
// import {Form} from '../Form/Form'

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

  function limpar() {
    reset({});
    onClear();
  }

  return (
   
    <View>
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
     </View>
  );
}
