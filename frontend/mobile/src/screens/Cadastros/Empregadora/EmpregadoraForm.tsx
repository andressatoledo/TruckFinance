import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { InputCombo } from '../../../components/Form/InputCombo';
import { EmpregadoraFormData } from '../../../../shared/schemas/empregadora.schema';
import { useEmpregadoraForm } from '../../../hooks/Empregadora/useEmpregadoraForm';
import {EmpregadoraStatusOptions} from '../../../../shared/types/Empregadora/empregadoraStatus';
import { EmpregadoraPrazoPagamentoOptions } from '../../../../shared/types/Empregadora/empregadoraPrazoPagamento';
import { BooleanField } from "../../../components/Form/BooleanField";

type EmpregadoraFormProps = NativeStackScreenProps<
  RootStackParamList,
  'EmpregadoraForm'
>;

export function EmpregadoraForm({ route, navigation }: EmpregadoraFormProps) {
  const { mode, empregadoraId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  } = useEmpregadoraForm(mode, empregadoraId, navigation);

  const onSubmitFinal = (data: EmpregadoraFormData) => {
    saveAll(data);
  };

  return (
    <Form>
      

      <Controller
        control={control}
        name="empregadoraNome"
        render={({ field }) => (
          <InputField
            label="Nome *"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.empregadoraNome?.message}
          />
        )}
      />
      {/* RadioButton para adiantamento */}
     
      <Controller
        control={control}
        name="empregadoraHasAdiantamento"
        render={({ field }) => (
          <BooleanField
            label="Possui adiantamento"
            value={field.value}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.empregadoraHasAdiantamento?.message}
            variant="switch"
          />
        )}
      />

      <Controller
        control={control}
        name="empregadoraValorAdiantamento"
        render={({ field }) => (
          <InputField
            label="Valor do adiantamento (R$)"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.empregadoraValorAdiantamento?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="empregadoraPrazoPagamento"
        render={({ field }) => (
          <InputCombo
            label="Prazo de pagamento *"
            value={field.value}
            options={EmpregadoraPrazoPagamentoOptions.map(prazo => ({
              label: prazo,
              value: prazo,
            }))}
            onChange={field.onChange}
            error={errors.empregadoraPrazoPagamento?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="empregadoraStatus"
        render={({ field }) => (
          <InputCombo
            label="Status da empregadora *"
            value={field.value}
            options={EmpregadoraStatusOptions.map(status => ({
              label: status,
              value: status,
            }))}
            onChange={field.onChange}
            error={errors.empregadoraStatus?.message}
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
