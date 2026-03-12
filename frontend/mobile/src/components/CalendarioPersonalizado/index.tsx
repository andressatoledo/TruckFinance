import { View, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeType, useTheme } from '../../theme/themeContext';
import { styles } from './styles';
import { useCalendarioPersonalizado } from '../../hooks/Calendario/useCalendarioPersonalizado';

interface Props {
  dataInicio: Date | null;
  dataFim: Date | null;
  onChangeInicio: (date: Date | null) => void;
  onChangeFim: (date: Date | null) => void;
  theme: ThemeType;
}

export function CalendarioPersonalizado(props: Props) {
  const { theme } = useTheme();
  const stylesCalendario = styles(theme);

  const {
    dataAtual,
    mesAnoFormatado,
    inicioFormatado,
    fimFormatado,
    markedDates,
    selecionarDia,
    avancar,
    voltar,
    format,
  } = useCalendarioPersonalizado(props);

  return (
    <View style={stylesCalendario.container}>
      <View style={stylesCalendario.header}>
        <Pressable onPress={voltar}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={theme.colors.detail}/>
        </Pressable>

        <Text style={stylesCalendario.headerTitle}>
          {mesAnoFormatado}
        </Text>

        <Pressable onPress={avancar}>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.detail}/>
        </Pressable>
      </View>

      <Text style={stylesCalendario.periodo}>
        {inicioFormatado} até {fimFormatado}
      </Text>

      <Calendar
        key={format(dataAtual)}
        current={format(dataAtual)}
        markingType="period"
        markedDates={markedDates}
        hideExtraDays
        hideArrows
        onDayPress={day => selecionarDia(day.dateString)}
        renderHeader={() => null}
        theme={{
          backgroundColor: theme.colors.backgroundCard,
          calendarBackground: theme.colors.backgroundCard,
            monthTextColor: theme.colors.detail,
            dayTextColor: theme.colors.text,
        //   textDayHeader: theme.colors.text,
        }}
      />
    </View>
  );
}
