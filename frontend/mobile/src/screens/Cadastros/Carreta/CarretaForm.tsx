import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { InputCombo } from '../../../components/Form/InputCombo';
import { CarretaFormData } from '../../../../shared/schemas/carreta.schema';
import { useCarretaForm } from '../../../hooks/Carreta/useCarretaForm';
import {CarretaTipos,CarretaStatus} from '../../../../shared/types/Carreta/carreta';

type CarretaFormProps = NativeStackScreenProps<
  RootStackParamList,
  'CarretaForm'
>;

export function CarretaForm({ route, navigation }: CarretaFormProps) {
  const { mode, carretaId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  } = useCarretaForm(mode, carretaId, navigation);

  const onSubmitFinal = (data: CarretaFormData) => {
    saveAll(data);
  };

  return (
    <Form>
      

      <Controller
        control={control}
        name="carretaPlaca"
        render={({ field }) => (
          <InputField
            label="Placa"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.carretaPlaca?.message}
          />
        )}
      />

        <Controller
        control={control}
        name="carretaQuantidadeEixosVazio"
        render={({ field }) => (
          <InputField
            label="Quantidade de eixos vazio"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.carretaQuantidadeEixosVazio?.message}
          />
        )}
      />


      <Controller
        control={control}
        name="carretaQuantidadeEixosCheio"
        render={({ field }) => (
          <InputField
            label="Quantidade de eixos cheio"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.carretaQuantidadeEixosCheio?.message}
          />
        )}
      />


    
        <Controller
        control={control}
        name="carretaStatus"
        render={({ field }) => (
          <InputCombo
            label="Status da carreta"
            value={field.value}
            options={CarretaStatus.map(status => ({
              label: status,
              value: status,
            }))}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="carretaTipo"
        render={({ field }) => (
          <InputCombo
            label="Tipo da carreta"
            value={field.value}
            options={CarretaTipos.map(tipo => ({
              label: tipo,
              value: tipo,
            }))}
            onChange={field.onChange}
          />
        )}
      />

     

      {!screen.isView && (
        <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(onSubmitFinal)}
          marginTop={3}
        />
     
      )}
    </Form>
  );
}
