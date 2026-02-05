import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { SubmitButton } from '../../../components/Form/SubmitButton';
import { Form } from '../../../components/Form/Form';
import { usePedagioForm } from '../../../hooks/usePedagioForm';
import {safeValue} from '../../../utils/safeValue'

type PedagioFormProps = NativeStackScreenProps<
  RootStackParamList,
  'PedagioForm'
>;

export function PedagioForm({ route, navigation }: PedagioFormProps) {
  const { mode, pedagioId } = route.params;
  const { control, errors, screen, handleSubmit } = usePedagioForm(
    mode,
    pedagioId,
    navigation,
  );

  
  return (
    <Form>
      <Controller
        control={control}
        name="pedagioNome"
        render={({ field }) => (
          <InputField
            label="Nome do pedágio"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.pedagioNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="pedagioLocalizacao"
        render={({ field }) => (
          <InputField
            label="Localização"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.pedagioLocalizacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="pedagioRodovia"
        render={({ field }) => (
          <InputField
            label="Rodovia"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.pedagioRodovia?.message}
          />
        )}
      />

      {!screen.isView && (
        <SubmitButton
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit}
        />
      )}
    </Form>
  );
}
