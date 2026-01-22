import { View, Text } from 'react-native';
import { useTheme } from '../../theme/themeContext';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { opcoesCalendario } from '../../../shared/types/opcoesCalendario';
import { Tag } from '../Tag';
import { Row } from '../Form/Row';
import { styles } from './styles';
import { useCalendario } from '../../hooks/useCalendario';
import { ArrowButton } from '../Form/Seta';
import { CalendarioPersonalizado } from '../CalendarioPersonalizado';

export function Calendario() {
  const { theme } = useTheme();
  const stylesCalendario = styles(theme);

  const {
    opcao,
    calendario,
    trocarOpcao,
    avancar,
    voltar,
    dataInicio,
    dataFim,
    setDataInicio,
    setDataFim,
  } = useCalendario();

  return (
    <View style={stylesCalendario.card}>
      {/* TAGS */}
      <Row>
        {Object.values(opcoesCalendario).map((item) => (
            <Tag
                value={item}
                isActive={opcao === item}
                onPress={() => trocarOpcao(item)}
                textColor={theme.colors.detail}
                backgroundColor={theme.colors.detail}
            />

        ))}

      </Row>

     
      {opcao !== opcoesCalendario.personalizado && (
        <View style={stylesCalendario.container}>
          <View style={stylesCalendario.container}>
            <ArrowButton direction="left" onPress={voltar} />

            <View style={stylesCalendario.centralizado}>
                <Text style={stylesCalendario.principal}>{calendario.principal}</Text>
                {!!calendario.secundario && (
                <Text style={stylesCalendario.secundario}>
                    {calendario.secundario}
                </Text>
                )}
                <Text style={stylesCalendario.detalhe}>{calendario.detalhe}</Text>
            </View>

            <ArrowButton direction="right" onPress={avancar} />
            </View>

        </View>
      )}

      {/* PERSONALIZADO */}
      {opcao === opcoesCalendario.personalizado && (
        // <View>
        //   {opcao === opcoesCalendario.personalizado && (
        //     <View style={styles.header}>
        // <Pressable onPress={voltar}>
        //     <MaterialCommunityIcons name="chevron-left" />
        // </Pressable>

        // <Text style={styles.headerTitle}>
        //     {mesAnoFormatado}
        // </Text>

        // <Pressable onPress={avancar}>
        //     <MaterialCommunityIcons name="chevron-right" />
        // </Pressable>
        // </View>
            // 
            <CalendarioPersonalizado
                dataInicio={dataInicio}
                dataFim={dataFim}
                onChangeInicio={setDataInicio}
                onChangeFim={setDataFim}
                theme={theme}
            />
        
      )}
    </View>
  );
}
