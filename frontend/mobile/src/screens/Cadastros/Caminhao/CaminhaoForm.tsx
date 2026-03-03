import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { InputCombo } from '../../../components/Form/InputCombo';
// import { CaminhaoFormData } from '../../../../shared/schemas/caminhao.schema';
import { useCaminhaoForm } from '../../../hooks/Caminhao/useCaminhaoForm';
import { Panel } from '../../../components/Form/Panel';
import { SectionTitle } from '../../../components/Form/SectionTitle';
import { DateField } from '../../../components/Form/InputDate';

type CaminhaoFormProps = NativeStackScreenProps<
  RootStackParamList,
  'CaminhaoForm'
>;

export function CaminhaoForm({ route, navigation }: CaminhaoFormProps) {
  const { mode, caminhaoId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    optionsEmpregadoras,
    loadingEmpregadoras,
  } = useCaminhaoForm(mode, caminhaoId, navigation);

  //   const [dateField, setDateField] = useState<string | null>(null);

//   const onSubmitFinal = (data: CaminhaoFormData) => {
//     saveAll(data);
//   };

  return (
    <Form>
      <Controller
        control={control}
        name="empregadoraId"
        render={({ field }) => (
          <InputCombo
            label="Empregadora"
            value={field.value}
            options={optionsEmpregadoras}
            loading={loadingEmpregadoras}
            onChange={field.onChange}
            error={errors.empregadoraId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="caminhaoNome"
        render={({ field }) => (
          <InputField
            label="Nome do caminhão"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.caminhaoNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="caminhaoAnoFabricacao"
        render={({ field }) => (
          <InputField
            label="Ano de fabricação"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.caminhaoAnoFabricacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="caminhaoPlaca"
        render={({ field }) => (
          <InputField
            label="Placa"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.caminhaoPlaca?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="caminhaoCapacidadeDeCarga"
        render={({ field }) => (
          <InputField
            label="Capacidade de carga (ton)"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.caminhaoCapacidadeDeCarga?.message}
          />
        )}
      />

      {/* 🔹 STATUS */}
      <Controller
        control={control}
        name="caminhaoStatus"
        render={({ field }) => (
          <InputCombo
            label="Status do caminhão"
            value={field.value}
            options={[
              { label: 'Ativo', value: 'Ativo' },
              { label: 'Inativo', value: 'Inativo' },
              { label: 'Manutenção', value: 'Manutenção' },
            ]}
            onChange={field.onChange}
          />
        )}
      />

      <Panel title="Documentos">
      
        <SectionTitle title="IPVA" />

        <DateField
          name="caminhaoDocumentos.ipva.dataExpiracao"
          label="Data de expiração"
          control={control}
          errors={errors}
        />

        <Controller
          control={control}
          name="caminhaoDocumentos.ipva.status"
          render={({ field }) => (
            <InputCombo
              label="Status"
              value={field.value}
              options={[
                { label: 'Válido', value: 'Válido' },
                { label: 'A vencer', value: 'A vencer' },
                { label: 'Vencido', value: 'Vencido' },
              ]}
              onChange={field.onChange}
            />
          )}
        />

        <SectionTitle title="Seguro" />
        <DateField
          name="caminhaoDocumentos.seguro.dataExpiracao"
          label="Data de expiração"
          control={control}
          errors={errors}
          readOnly={screen.readOnly}
        />

        <Controller
          control={control}
          name="caminhaoDocumentos.seguro.status"
          render={({ field }) => (
            <InputCombo
              label="Status"
              value={field.value}
              options={[
                { label: 'Válido', value: 'Válido' },
                { label: 'Expirado', value: 'Expirado' },
              ]}
              onChange={field.onChange}
            />
          )}
        />

        <SectionTitle title="CRLV" />

        <DateField
          name="caminhaoDocumentos.crlv.dataExpiracao"
          label="Data de expiração"
          control={control}
          errors={errors}
          readOnly={screen.readOnly}
        />

        <Controller
          control={control}
          name="caminhaoDocumentos.crlv.status"
          render={({ field }) => (
            <InputCombo
              label="Status"
              value={field.value}
              options={[
                { label: 'Válido', value: 'Válido' },
                { label: 'Em processo', value: 'Em processo' },
                { label: 'Vencido', value: 'Vencido' },
              ]}
              onChange={field.onChange}
            />
          )}
        />

          <SectionTitle
          title="Manutenção"
        />


        <DateField
          name="caminhaoUltimaManutencao"
          label="Última manutenção"
          control={control}
          errors={errors}
          readOnly={screen.readOnly}
        />

        <DateField
          name="caminhaoTrocaDeOleo"
          label="Última troca de óleo"
          control={control}
          errors={errors}
          readOnly={screen.readOnly}
        />
      </Panel>

      {!screen.isView && (
        // <Button
        //   label={mode === 'create' ? 'Salvar' : 'Atualizar'}
        //   onPress={handleSubmit(onSubmitFinal)}
        //   marginTop={3}
        // />
        <Button
            label={mode === 'create' ? 'Salvar' : 'Atualizar'}
            onPress={handleSubmit(
                (data) => {
                saveAll(data).catch(err => {
                    console.error("Erro no saveAll:", err);
                });
                },
                (errinhos) => {
                console.log("Erros de validação do form:", errinhos);
                }
            )}
            />
      )}
    </Form>
  );
}
