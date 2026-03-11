import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { CargaFormData } from '../../../../shared/schemas/carga.schema';
import { useCargaForm } from '../../../hooks/Carga/useCargaForm';

type CargaFormProps = NativeStackScreenProps<
  RootStackParamList,
  'CargaForm'
>;

export function CargaForm({ route, navigation }: CargaFormProps) {
  const { mode, cargaId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  } = useCargaForm(mode, cargaId, navigation);

  const onSubmitFinal = (data: CargaFormData) => {
    saveAll(data);
  };

  return (
    <Form>
     
      <Controller
        control={control}
        name="cargaTipo"
        render={({ field }) => (
          <InputField
            label="Tipo de carga"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.cargaTipo?.message}
          />
        )}
      />

      {!screen.isView && (
        <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(onSubmitFinal)}
          marginTop={3}
        />
        // <Button
        //     label={mode === 'create' ? 'Salvar' : 'Atualizar'}
        //     onPress={handleSubmit(
        //         (data) => {
        //         saveAll(data).catch(err => {
        //             console.error("Erro no saveAll:", err);
        //         });
        //         },
        //         (errinhos) => {
        //         console.log("Erros de validação do form:", errinhos);
        //         }
        //     )}
        //     />
      )}
    </Form>
  );
}
