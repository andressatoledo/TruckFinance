import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { EmptyGrid } from '../../../components/Feedback/EmptyGrid';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { usePedagioForm } from '../../../hooks/usePedagioForm';
import { safeValue } from '../../../utils/safeValue';
import { View } from 'react-native';
import { Grid } from '../../../components/Grid/Grid';
import { PedagioValor } from '../../../../shared/types/PedagioValor';
import { usePedagioValores } from '../../../hooks/usePedagioValor';
import { Divider } from '../../../components/Divider';
import { PedagioFormData } from '../../../../shared/schemas/pedagio.schema';
type PedagioFormProps = NativeStackScreenProps<
  RootStackParamList,
  'PedagioForm'
>;

export function PedagioForm({ route, navigation }: PedagioFormProps) {
  const { mode, pedagioId } = route.params;
  const { control, errors, screen, handleSubmit, saveAll } = usePedagioForm(
    mode,
    pedagioId,
    navigation,
  );

  const { valores, adicionarLinhaVazia, salvarLinha, removerLinha } =
    usePedagioValores(mode, pedagioId);
  const colunas: {
    key: keyof PedagioValor;
    label: string;
    keyboardType: 'numeric' | 'default';
  }[] = [
    {
      key: 'pedagioValorNumeroEixos',
      label: 'Número de eixos',
      keyboardType: 'numeric',
    },
    {
      key: 'pedagioValorPedagio',
      label: 'Valor (R$)',
      keyboardType: 'numeric',
    },
  ];

  const onSubmitFinal = (data: PedagioFormData) => {
    saveAll(data, valores);
  };

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

      <Divider text="Valores" />

      {valores.length === 0 ? (
        <EmptyGrid
          title="Nenhum valor cadastrado"
          description="Adicione os valores de pedágio por número de eixos."
          icon="cash-remove"
          actionLabel="Adicionar valor"
          onActionPress={adicionarLinhaVazia}
        />
      ) : (
        <View>
          <Grid<PedagioValor>
            data={valores}
            columns={colunas}
            onSave={salvarLinha}
            onDelete={removerLinha}
            ConfirmDialogProps={{
              title: 'Excluir valor de pedágio',
              description: 'Deseja excluir este valor de pedágio? Essa ação não poderá ser desfeita.',
              confirmText: 'Excluir',
              cancelText: 'Cancelar',
              danger: true,
            }}
          />
          <Button
            paddingVertical={10}
            icon="plus"
            borderRadius={10}
            onPress={adicionarLinhaVazia}
            marginTop={-10}
          />
        </View>
      )}

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
