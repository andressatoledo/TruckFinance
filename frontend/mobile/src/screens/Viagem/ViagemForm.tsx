import { ScrollView, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
// import { ViagemFormData } from '../../../shared/schemas/viagem.schema';
import { ViagemStatus } from '../../../shared/types/viagem';

import { InputField } from '../../components/Form/InputField';
import { InputCombo } from '../../components/Form/InputCombo';
import { TimePickerField } from '../../components/Form/InputTimePickerField';
import { ValueCard } from '../../components/Form/ValueCard';
import { Row } from '../../components/Form/Row';
import { SubmitButton } from '../../components/Form/SubmitButton';
import { Panel } from '../../components/Form/Panel';

import { useTheme } from '../../theme/themeContext';
import { calcularValorTonelada } from '../../services/calcularValorTonelada';
import { useViagemForm } from '../../hooks/useViagemForm';

type Props = NativeStackScreenProps<RootStackParamList, 'ViagemForm'>;

export function ViagemForm({ route, navigation }: Props) {
  const { mode, viagemId } = route.params;
  const { theme } = useTheme();

  const {
    control,
    errors,
    readOnly,
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
  } = useViagemForm(mode, viagemId, navigation);

  const [showInicio, setShowInicio] = useState(false);
  const [showFim, setShowFim] = useState(false);
  const [showPagamento, setShowPagamento] = useState(false);

  /* 🔢 Cálculo automático */
  const toneladas =
  useWatch({ control, name: 'viagemToneladaCarregada' }) ?? 0;
  
  const valorTonelada =
  useWatch({ control, name: 'viagemValorTonelada' }) ?? 0;

  const valorFrete = useMemo(() => {
    return calcularValorTonelada(toneladas, valorTonelada);
  }, [toneladas, valorTonelada]);

  const formatDate = (date?: Date) =>
    date ? date.toLocaleDateString('pt-BR') : '';

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 24, color: theme.colors.text }}>
        {mode === 'create' ? 'Nova Viagem' : 'Viagem'}
      </Text>

       {/* Horários de Início e Chegada */}
      <Row>
        <View style={{ flex: 1 }}>
        <Controller
          control={control}
          name="viagemDataInicio"
          render={({ field }) => (
            <>
              <InputField
                label="Início da viagem"
                icon="calendar"
                value={formatDate(field.value)}
                editable={false}
                onPress={() => !readOnly && setShowInicio(true)}
                error={errors.viagemDataInicio?.message}
                placeholder='Selecione a data'
              />
              {showInicio && (
                <DateTimePicker
                  value={field.value ?? new Date()}
                  mode="date"
                  disabled={readOnly}
                  onChange={(_, d) => {
                    setShowInicio(false);
                    if (d) field.onChange(d);
                  }}
                />
              )}
            </>
          )}
        />
        </View>
        <View style={{ flex: 1 }}>
        <Controller
          control={control}
          name="viagemHorarioChegada"
          render={({ field }) => (
            <TimePickerField
              label="Hora início"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        </View>
      </Row>

       {/* Horários de Início e Chegada */}
      <Row>
        <View style={{ flex: 1 }}>
          <Controller
          control={control}
          name="viagemDataFim"
          render={({ field }) => (
            <>
              <InputField
                label="Fim da viagem"
                icon="calendar"
                value={formatDate(field.value)}
                editable={false}
                onPress={() => !readOnly && setShowFim(true)}
                error={errors.viagemDataFim?.message}
                placeholder='Selecione a data'
              />
              {showFim && (
                <DateTimePicker
                  value={field.value ?? new Date()}
                  mode="date"
                  disabled={readOnly}
                  onChange={(_, d) => {
                    setShowFim(false);
                    if (d) field.onChange(d);
                  }}
                />
              )}
            </>
          )}
        />
        
        </View>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="viagemHorarioSaida"
            render={({ field }) => (
              <TimePickerField
                label="Hora saída"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
      </View>
         
      </Row>

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
            error={errors.motoristaId?.message}
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
            error={errors.rotaVinculadaId?.message}
          />
        )}
      />

      {/* Toneladas / Valor */}
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
      </Row>

     

      <Panel title="Detalhamento" defaultExpanded={false}>
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
            error={errors.empregadoraId?.message}
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
      />

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

        
        <Controller
          control={control}
          name="viagemDataPagamento"
          render={({ field }) => (
            <>
              <InputField
                label="Data de pagamento"
                icon="calendar"
                value={formatDate(field.value)}
                editable={false}
                onPress={() => !readOnly && setShowPagamento(true)}
                error={errors.viagemDataPagamento?.message}
                placeholder='Selecione a data'
              />
              
              {showPagamento && (
                <DateTimePicker
                  value={field.value ?? new Date()}
                  mode="date"
                  disabled={readOnly}
                  onChange={(_, d) => {
                    setShowPagamento(false);
                    if (d) field.onChange(d);
                  }}
                />
              )}
            </>
          )}
        />

      </Panel>

      {/* <Panel title="Totais da viagem" defaultExpanded> */}
      {/* Panel de Totais*/}
        <ValueCard
          label="Lucro"
          value="R$ 850,00"
          icon={"trending-up"}
          color={theme.colors.cardLucroText}
          backgroundColor={theme.colors.cardLucro}
        />

        <ValueCard
          label="Frete"
          value={'R$ ' + valorFrete}
          icon={"currency-usd"}
          color={theme.colors.cardFreteText}
          backgroundColor={theme.colors.cardFrete}
        />
        <ValueCard
          label="Pedágios"
          value="R$ 350,00"
          icon={"boom-gate"}
          color={theme.colors.cardPedagioText}
          backgroundColor={theme.colors.cardPedagio}
        />
      {/* </Panel>  */}
      
      {/* Botão de submit */}
      {!readOnly && (
        <SubmitButton
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit}
          // loading={loading}
        />

      )}
    </ScrollView>
  );
}