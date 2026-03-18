import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../../components/Form/InputField';
import { Button } from '../../../components/Form/Button';
import { Form } from '../../../components/Form/Form';
import { InputCombo } from '../../../components/Form/InputCombo';
import { ManutencaoFormData } from '../../../../shared/schemas/manutencao.schema';
import { useManutencaoForm } from '../../../hooks/Manutencao/useManutencaoForm';
import {ManutencaoTipoOptions} from '../../../../shared/types/Manutencao/manutencaoTipo';
import { ManutencaoCategoriaOptions } from '../../../../shared/types/Manutencao/manutencaoCategoria';
import { DateField } from '../../../components/Form/InputDate';

//Upload
// import {FileViewer} from '../../../components/Upload/FileViewer';
// import { Upload } from '../../../components/Upload/Upload';
// import { View } from 'react-native';
// import { StoredFile } from '../../../../shared/types/Upload/upload';

type ManutencaoFormProps = NativeStackScreenProps<
  RootStackParamList,
  'ManutencaoForm'
>;

export function ManutencaoForm({ route, navigation }: ManutencaoFormProps) {
  const { mode, manutencaoId } = route.params;
  
  const {
    control,
    errors,
    screen,
     loadingCaminhoes,
    loadingCarretas,
     optionsCaminhoes,
    optionsCarretas,
    handleSubmit,
    saveAll,
  } = useManutencaoForm(mode, manutencaoId, navigation);

  const onSubmitFinal = (data: ManutencaoFormData) => {
    saveAll(data);
  };

  return (

    <>
    <Form>
      

      <Controller
        control={control}
        name="manutencaoDescricao"
        render={({ field }) => (
          <InputField
            label="Descrição *"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.manutencaoDescricao?.message}
          />
        )}
      />

       <Controller
        control={control}
        name="manutencaoCategoria"
        render={({ field }) => (
          <InputCombo
            label="Categoria da manutenção *"
            value={field.value}
            options={ManutencaoCategoriaOptions.map(categoria => ({
              label: categoria,
              value: categoria,
            }))}
            onChange={field.onChange}
            error={errors.manutencaoCategoria?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="manutencaoTipo"
        render={({ field }) => (
          <InputCombo
            label="Tipo de manutenção *"
            value={field.value}
            options={ManutencaoTipoOptions.map(tipo => ({
              label: tipo,
              value: tipo,
            }))}
            onChange={field.onChange}
            error={errors.manutencaoTipo?.message}
          />
        )}
      />

       <Controller
        control={control}
        name="caminhaoId"
        
        render={({ field }) => (
          <InputCombo
            label="Caminhão"
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
        name="carretaId"
        render={({ field }) => (
          <InputCombo
            label="Carreta"
            value={field.value}
            options={optionsCarretas}
            loading={loadingCarretas}
            onChange={field.onChange}
            error={errors.carretaId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="manutencaoValor"
        render={({ field }) => (
          <InputField
            label="Valor (R$)"
            keyboardType="numeric"
            placeholder='Valor da manutenção com serviço embutido'
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.manutencaoValor?.message}
          />
        )}
      />



      <DateField
        name="manutencaoData"
        label="Data da manutenção"
        control={control}
        errors={errors}
        readOnly={screen.readOnly}
      />
              
      <Controller
        control={control}
        name="manutencaoKm"
        render={({ field }) => (
          <InputField
            label="Km"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.manutencaoKm?.message}
          />
        )}
      />

      
      <DateField
        name="manutencaoProximaData"
        label="Próxima data de manutenção"
        control={control}
        errors={errors}
        readOnly={screen.readOnly}
      />


       <Controller
        control={control}
        name="manutencaoProximoKm"
        render={({ field }) => (
          <InputField
            label="Próximo Km para manutenção"
            keyboardType="numeric"
            value={field.value?.toString() ?? ''}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.manutencaoProximoKm?.message}
          />
        )}
      />

       <Controller
        control={control}
        name="manutencaoLocal"
        render={({ field }) => (
          <InputField
            label="Local"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.manutencaoLocal?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="manutencaoObservacao"
        render={({ field }) => (
          <InputField
            label="Observação"
            value={field.value}
            onChangeText={text => field.onChange(text.toUpperCase())}
            editable={!screen.readOnly}
            error={errors.manutencaoObservacao?.message}
          />
        )}
      />

      

      {/* {!screen.isView && (
        <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(onSubmitFinal)}
          marginTop={3}
        />
     
      )} */}

      
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
            {/* <Controller
  control={control}
  name="manutencaoDocumentos"
  render={({ field }) => {
    const files = field.value ?? [];

    return (
      <View>
        <Upload
          onUploaded={(file: StoredFile) => {
            field.onChange([...files, file]);
          }}
        />

        <FileViewer
          files={files}
          onRemove={(file: StoredFile) => {
            field.onChange(
              files.filter(f => f.url !== file.url)
            );
          }}
        />
      </View>
    );
  }}
/> */}

    </>
  );
}
