import { ScrollView, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { ViagemStatus } from '../../../shared/types/viagem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InputCombo } from '../../components/Form/InputCombo';
import { SubmitButton } from '../../components/Form/SubmitButton';

import {Button } from '../../components/Form/Button';

import { useTheme } from '../../theme/themeContext';
import { useViagemFilter } from '../../hooks/useViagemFilter';
import ViagemFiltro from '../../../shared/types/viagemFiltro';

interface Props {
  onClose: () => void;
  onApplyFiltro: (filtro: ViagemFiltro) => void;
  filtroAtual: ViagemFiltro;
}

export function ViagemFilter({ onClose, onApplyFiltro, filtroAtual }: Props) {
  console.log(filtroAtual.dataFim, filtroAtual.dataInicio)
//   const { mode, viagemId } = route.params;
  const { theme } = useTheme();

  const {
    control,
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
  } = useViagemFilter({ onApplyFiltro, filtroAtual });

  const tabBarHeight = useBottomTabBarHeight();
  
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.background,
        paddingBottom: tabBarHeight + insets.bottom + 50
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