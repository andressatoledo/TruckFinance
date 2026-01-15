import { ScrollView, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useViagemForm } from '../../hooks/useViagemForm';
import { ViagemStatus } from '../../../shared/types/viagem';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { InputCombo } from '../../components/Form/InputCombo';
import { InputField } from '../../components/Form/InputField';
import { TimePickerField } from '../../components/Form/InputTimePickerField';
import { ValueCard } from '../../components/Form/ValueCard';
import { Row } from '../../components/Form/Row';
import { SubmitButton } from '../../components/Form/SubmitButton';
import { useRotaVinculadaCombo } from '../../hooks/useRotaVinculadaCombo';
import { useMotoristaCombo } from '../../hooks/useMotoristaCombo';
import { useCarretaCombo } from '../../hooks/useCarretaCombo';
import { useCaminhaoCombo } from '../../hooks/useCaminhaoCombo';
import { useEmpregadoraCombo } from '../../hooks/useEmpregadoraCombo';
import { useTheme } from '../../theme/themeContext';
import { Panel } from '../../components/Form/Panel';
import { calcularValorTonelada } from '../../services/calcularValorTonelada';
import { useMemo } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'ViagemForm'>;


export function ViagemForm({ route, navigation }: Props) {
  const { mode, viagemId } = route.params;
  const { optionsRotas, loadingRotas } = useRotaVinculadaCombo();
  const { optionsMotoristas, loadingMotoristas } = useMotoristaCombo();
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();
  const { optionsCarretas, loadingCarretas } = useCarretaCombo();
  const { optionsEmpregadoras, loadingEmpregadoras } = useEmpregadoraCombo();
  const { theme } = useTheme();

  const [showDateInicio, setShowDateInicio] = useState(false);
  const [showDateFim, setShowDateFim] = useState(false);
  const [showDatePagamento, setShowDatePagamento] = useState(false);
  
  const {
    data,
    setData,
    submit,
    readOnly,
    loading: loadingViagem,
  } = useViagemForm(mode, viagemId);

  const valorFrete = useMemo(() => {
  if (!data?.viagemToneladaCarregada || !data?.viagemValorTonelada) {
    return 0;
  }

  return calcularValorTonelada(
    data.viagemToneladaCarregada,
    data.viagemValorTonelada
  );
}, [data?.viagemToneladaCarregada, data?.viagemValorTonelada]);

  if (loadingViagem) {
    return <Text>Carregando...</Text>;
  }

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    await submit();
    navigation.goBack();
  };

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
         {/* Data Início */}
        <InputField
          label="Início da viagem"
          icon="calendar"
          value={formatDate(data?.viagemDataInicio)}
          placeholder="dd/mm/aaaa"
          editable={false}
          onPress={() => !readOnly && setShowDateInicio(true)}
        />
        {showDateInicio && (
          <DateTimePicker
            value={data.viagemDataInicio ? new Date(data.viagemDataInicio) : new Date()}
            mode="date"
            display="calendar"
            onChange={(_, selectedDate) => {
              setShowDateInicio(false);
              if (selectedDate) setData({ ...data, viagemDataInicio: selectedDate });
            }}
          />
        )}
        </View>
        <View style={{ flex: 1 }}>
          <TimePickerField
            label="Hora de início"
            icon="clock-outline"
            value={data.viagemHorarioChegada ?? ''}
            onChange={(time) => setData({ ...data, viagemHorarioChegada: time })}
          />
        </View>
       
      </Row>

       {/* Horários de Início e Chegada */}
      <Row>
        <View style={{ flex: 1 }}>
          {/* Data Fim */}
          <InputField
            label="Fim da viagem"
            icon="calendar"
            value={formatDate(data.viagemDataFim)}
            placeholder="dd/mm/aaaa"
            editable={false}
            onPress={() => !readOnly && setShowDateFim(true)}
          />
          {showDateFim && (
            <DateTimePicker
              value={data.viagemDataFim ? new Date(data.viagemDataFim) : new Date()}
              mode="date"
              display="calendar"
              onChange={(_, selectedDate) => {
                setShowDateFim(false);
                if (selectedDate) setData({ ...data, viagemDataFim: selectedDate });
              }}
            />
          )}
            </View>
        <View style={{ flex: 1 }}>
          <TimePickerField
            label="Hora de fim"
            icon="clock-outline"
            value={data.viagemHorarioSaida ?? ''}
            onChange={(time) => setData({ ...data, viagemHorarioSaida: time })}
          />
        </View>
      </Row>

      
      <InputCombo
        label="Motorista"
        value={data.motoristaId ?? ''}
        options={optionsMotoristas}
        loading={loadingMotoristas}
        onChange={(value) => setData({ ...data, motoristaId: value })}
      />
      
      {/* Rota */}
      <InputCombo
        label="Rota"
        value={data.rotaVinculadaId ?? ''}
        options={optionsRotas}
        loading={loadingRotas}
        onChange={(value) => setData({ ...data, rotaVinculadaId: value })}
      />

      {/* Toneladas / Valor */}
      <Row>
        <View style={{ flex: 1 }}>
          <InputField
            label="Toneladas"
            icon="weight"
            value={String(data.viagemToneladaCarregada ?? '')}
            keyboardType="numeric"
            editable={!readOnly}
            onChangeText={(v) => setData({ ...data, viagemToneladaCarregada: Number(v) })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField
            label="Frete (R$)"
            icon="currency-usd"
            value={String(data.viagemValorTonelada ?? '')}
            keyboardType="numeric"
            editable={!readOnly}
            onChangeText={(v) => setData({ ...data, viagemValorTonelada: Number(v) })}
          />
        </View>
      </Row>

     

      <Panel title="Detalhamento" defaultExpanded={false}>
      {/* Ocultas com panel */}
      <InputCombo
          label="Empregadora"
          value={data.empregadoraId ?? ''}
          options={optionsEmpregadoras}
          loading={loadingEmpregadoras}
          onChange={(value) => setData({ ...data, empregadoraId: value })}
        />

        <InputCombo
          label="Caminhão"
          value={data.caminhaoId ?? ''}
          options={optionsCaminhoes}
          loading={loadingCaminhoes}
          onChange={(value) => setData({ ...data, caminhaoId: value })}
        />

        <InputCombo
          label="Carreta"
          value={data.carretaId ?? ''}
          options={optionsCarretas}
          loading={loadingCarretas}
          onChange={(value) => setData({ ...data, carretaId: value })}
        />

        <InputField
            label="Distância (Km)"
            icon="map-marker-distance"
            value={String(data.viagemToneladaCarregada ?? '')}
            keyboardType="numeric"
            editable={!readOnly}
            onChangeText={(v) => setData({ ...data, viagemToneladaCarregada: Number(v) })}
        />

         {/* Status */}
        <InputCombo
          label="Status"
          icon="check-circle"
          value={data.viagemStatus}
          options={[
            { label: 'Aguardando pagamento', value: 'Aguardando pagamento' },
            { label: 'Pago', value: 'Pago' },
          ]}
          onChange={(v) => setData({ ...data, viagemStatus: v as ViagemStatus })}
          disabled={readOnly}
        />

        {/* Data de pagamento */}
        <InputField
          label="Data de pagamento"
          icon="calendar"
          value={formatDate(data.viagemDataPagamento)}
          placeholder="dd/mm/aaaa"
          editable={false}
          onPress={() => !readOnly && setShowDatePagamento(true)}
        />
        {showDatePagamento && (
          <DateTimePicker
            value={data.viagemDataPagamento ? new Date(data.viagemDataPagamento) : new Date()}
            mode="date"
            display="calendar"
            onChange={(_, selectedDate) => {
              setShowDatePagamento(false);
              if (selectedDate) setData({ ...data, viagemDataPagamento: selectedDate });
            }}
          />
        )}
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
        />
      )}
    </ScrollView>
  );
}