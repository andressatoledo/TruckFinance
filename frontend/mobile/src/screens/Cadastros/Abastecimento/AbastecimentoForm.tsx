import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { useAbastecimentoForm } from '../../../hooks/useAbastecimentoForm';
import { numberToString } from '../../../utils/numberToString';
import { AbastecimentoFormData } from '../../../../shared/schemas/abastecimento.schema';
import { safeValue } from '../../../utils/safeValue';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

type AbastecimentoFormProps = NativeStackScreenProps<
  RootStackParamList,
  'AbastecimentoForm'
>;

export function AbastecimentoForm({ route, navigation }: AbastecimentoFormProps) {
  const { mode, abastecimentoId } = route.params;
  const [showDate, setShowDate] = useState(false);

  const { control, errors, screen, handleSubmit, saveAll } =
    useAbastecimentoForm(mode, abastecimentoId, navigation);

  const onSubmitFinal = (data: AbastecimentoFormData) => {
    saveAll(data);
  };

  return (
    <Form>

      {/* 🔹 Litros */}
      <Controller
        control={control}
        name="abastecimentoLitros"
        render={({ field }) => (
          <InputField
            label="Litros abastecidos"
            value={numberToString(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="numeric"
            error={errors.abastecimentoLitros?.message}
          />
        )}
      />

      {/* 🔹 KM */}
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

      {/* 🔹 Tipo Pagamento */}
      <Controller
        control={control}
        name="abastecimentoTipoPagamento"
        render={({ field }) => (
          <InputField
            label="Tipo de pagamento"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.abastecimentoTipoPagamento?.message}
          />
        )}
      />

      {/* 🔹 Prazo Pagamento */}
      <Controller
        control={control}
        name="abastecimentoPrazoPagamento"
        render={({ field }) => (
          <InputField
            label="Prazo de pagamento"
            value={safeValue(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.abastecimentoPrazoPagamento?.message}
          />
        )}
      />

      {/* 🔹 Observação */}
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

      {/* 🔹 Valor */}
      <Controller
        control={control}
        name="abastecimentoValor"
        render={({ field }) => (
          <InputField
            label="Valor (R$)"
            value={numberToString(field.value)}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="numeric"
            error={errors.abastecimentoValor?.message}
          />
        )}
      />

      {/* 🔹 Data */}
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
          onPress={handleSubmit(onSubmitFinal)}
          marginTop={2}
        />
      )}

    </Form>
  );
}
