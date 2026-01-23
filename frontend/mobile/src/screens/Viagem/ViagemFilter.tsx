import { ScrollView, Text, View } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../navigation/types';
import { Controller } from 'react-hook-form';
// import { useMemo } from 'react';
// import { useWatch } from 'react-hook-form';
// import { ViagemFormData } from '../../../shared/schemas/viagem.schema';
import { ViagemStatus } from '../../../shared/types/viagem';

// import { InputField } from '../../components/Form/InputField';
import { InputCombo } from '../../components/Form/InputCombo';
import { SubmitButton } from '../../components/Form/SubmitButton';

import {Button } from '../../components/Form/Button';

import { useTheme } from '../../theme/themeContext';
// import { calcularValorTonelada } from '../../services/calcularValorTonelada';
import { useViagemFilter } from '../../hooks/useViagemFilter';

// type Props = NativeStackScreenProps<RootStackParamList, 'ViagemFilter'>;
interface Props {
  onClose: () => void;
}

export function ViagemFilter({ onClose }: Props) {

//   const { mode, viagemId } = route.params;
  const { theme } = useTheme();

  const {
    control,
    // errors,
    // readOnly,
    // setValue,
    handleSubmit,
    optionsMotoristas,
    optionsCaminhoes,
    optionsCarretas,
    optionsEmpregadoras,
    optionsRotas,
    loadingCaminhoes,
    loadingCarretas,
    loadingMotoristas,
    loadingEmpregadoras,
    loadingRotas,
  } = useViagemFilter();

  

  /* 🔢 Cálculo automático */
//   const toneladas =
//   useWatch({ control, name: 'viagemToneladaCarregada' }) ?? 0;
  
//   const valorTonelada =
//   useWatch({ control, name: 'viagemValorTonelada' }) ?? 0;


  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 24, color: theme.colors.text }}>
        {'Filtrar viagens'}
      </Text>

 

      <Controller
        control={control}
        name="motoristaId"
        render={({ field }) => (
          <InputCombo
            label="Motorista"
            value={field.value}
            options={optionsMotoristas}
            loading={loadingMotoristas}
            onChange={field.onChange}
            // error={errors.motoristaId?.message}
          />
        )}
      />

  
      <Controller
        control={control}
        name="rotaVinculadaId"
        render={({ field }) => (
          <InputCombo
            label="Rota"
            value={field.value}
            options={optionsRotas}
            loading={loadingRotas}
            onChange={field.onChange}
            // error={errors.rotaVinculadaId?.message}
          />
        )}
      />

      {/* Toneladas / Valor
      <Row>
        <View style={{ flex: 1 }}>
          <Controller
          control={control}
          name="viagemToneladaCarregada"
          
          render={({ field }) => (
            <InputField
              label="Toneladas"
              icon="weight"
              keyboardType="numeric"
              value={String(field.value ?? '')}
              onChangeText={(v) =>
                field.onChange(v ? Number(v) : 0)
              }
              error={errors.viagemToneladaCarregada?.message}
            />
          )}
        />
        </View>
         <View style={{ flex: 1 }}>
          <Controller
          control={control}
          name="viagemValorTonelada"
          render={({ field }) => (
            <InputField
              label="Frete (R$)"
              icon="currency-usd"
              keyboardType="numeric"
              value={String(field.value ?? '')}
              onChangeText={(v) =>
                field.onChange(v ? Number(v) : 0)
              }
              error={errors.viagemValorTonelada?.message}
            />
          )}
        />
        
        </View>
      </Row> */}

     

      {/* <Panel title="Detalhamento" defaultExpanded={false}> */}
      {/* Ocultas com panel */}
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
            // error={errors.empregadoraId?.message}
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
            // error={errors.caminhaoId?.message}
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
            // error={errors.carretaId?.message}
          />
        )}
      />

      {/* <Controller
        control={control}
        name="viagemDistancia"
        render={({ field }) => (
          <InputField
              label="Distância (Km)"
              icon="map-marker-distance"
              keyboardType="numeric"
              value={String(field.value ?? '')}
              onChangeText={(v) =>
                field.onChange(v ? Number(v) : 0)
              }
            />

         
        )}
      /> */}

         {/* Status */}
         <Controller
          control={control}
          name="viagemStatus"
          render={({ field }) => (
            <InputCombo
              label="Status"
              value={field.value}
              options={[
                { label: 'Aguardando pagamento', value: 'AguardandoPagamento' },
                { label: 'Pago', value: 'Pago' },
              ]}
              onChange={(v) => field.onChange(v as ViagemStatus)}
            />
          )}
      />

        
  
      
      {/* Botão de submit */}
      
        <View style={{ gap: 12, marginTop: 24 }}>
        <SubmitButton
            label="Aplicar filtros"
            onPress={handleSubmit}
        />




        <Button
            label="Cancelar"
            borderColor={theme.colors.primary}
            onPress={onClose}
        />
        </View>

      
    </ScrollView>
  );
}