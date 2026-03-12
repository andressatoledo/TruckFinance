import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { useAbastecimentoForm } from '../../../hooks/Abastecimento/useAbastecimentoForm';
import { InputCombo } from '../../../components/Form/InputCombo';
import { numberToString } from '../../../utils/numberToString';
import { AbastecimentoFormData } from '../../../../shared/schemas/abastecimento.schema';
import { safeValue } from '../../../utils/safeValue';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  tipoPagamentoOptions,
  prazoOptions,
} from '../../../../shared/types/Outros/financeiroEnum';

type AbastecimentoFormProps = NativeStackScreenProps<
  RootStackParamList,
  'AbastecimentoForm'
>;

export function AbastecimentoForm({
  route,
  navigation,
}: AbastecimentoFormProps) {
  const { mode, abastecimentoId } = route.params;
  const [showDate, setShowDate] = useState(false);

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    optionsCaminhoes,
    loadingCaminhoes,
  } = useAbastecimentoForm(mode, abastecimentoId, navigation);

  const onSubmitFinal = (data: AbastecimentoFormData) => {
    saveAll(data);
  };

  return (
    <Form>
      <Controller
        control={control}
        name="caminhaoId"
        render={({ field }) => (
          <InputCombo
            label="Caminhão *"
            value={field.value}
            options={optionsCaminhoes}
            loading={loadingCaminhoes}
            onChange={field.onChange}
            error={errors.caminhaoId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="abastecimentoLitros"
        render={({ field }) => (
          <InputField
            label="Litros abastecidos *"
            value={numberToString(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="numeric"
            error={errors.abastecimentoLitros?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="abastecimentoKm"
        render={({ field }) => (
          <InputField
            label="Km do caminhão"
            value={numberToString(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="numeric"
            error={errors.abastecimentoKm?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="abastecimentoTipoPagamento"
        render={({ field }) => (
          <InputCombo
            label="Tipo de pagamento"
            value={field.value}
            options={tipoPagamentoOptions}
            onChange={(value) => field.onChange(value || undefined)}
            disabled={screen.readOnly}
            error={errors.abastecimentoTipoPagamento?.message}
          />
        )}
      />

      <Controller
  control={control}
  name="abastecimentoPrazoPagamento"
  render={({ field }) => (
    <InputCombo
      label="Parcelamento"
      value={field.value}
      options={prazoOptions}
      onChange={(value) => field.onChange(value || undefined)}
      disabled={screen.readOnly}
      error={errors.abastecimentoPrazoPagamento?.message}
    />
  )}
/>

      <Controller
        control={control}
        name="abastecimentoObservacao"
        render={({ field }) => (
          <InputField
            label="Observação"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.abastecimentoObservacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="abastecimentoValor"
        render={({ field }) => (
          <InputField
            label="Valor total (R$) *"
            value={numberToString(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="numeric"
            error={errors.abastecimentoValor?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="abastecimentoData"
        render={({ field }) => (
          <>
            <InputField
              label="Data do abastecimento"
              icon="calendar"
              value={formatDate(field.value)}
              editable={false}
              placeholder="Selecione a data"
              onPress={() => !screen.readOnly && setShowDate(true)}
              error={errors.abastecimentoData?.message}
            />

            {showDate && (
              <DateTimePicker
                value={field.value ? new Date(field.value) : new Date()}
                mode="date"
                onChange={(_, d) => {
                  setShowDate(false);
                  if (d) field.onChange(d);
                }}
              />
            )}
          </>
        )}
      />

      {!screen.isView && (
        <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(
            data => {
              console.log('SUCESSO', data);
              onSubmitFinal(data);
            },
            errinhos => {
              console.log('ERROS', errinhos);
            },
          )}
          marginTop={2}
        />
      )}
    </Form>
  );
}
