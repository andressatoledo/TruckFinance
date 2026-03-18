import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/themeContext';

import { RootStackParamList } from './types';
import { ViagemForm } from '../screens/Viagem/ViagemForm';
import BottomTabs from './bottomTabs';

//Abastecimento
import { Abastecimento } from '../screens/Cadastros/Abastecimento';
import {AbastecimentoForm} from '../screens/Cadastros/Abastecimento/AbastecimentoForm'


//Pedagio
import { Pedagio } from '../screens/Cadastros/Pedagio';
import {PedagioForm} from '../screens/Cadastros/Pedagio/PedagioForm'

//Caminhão
import { Caminhao } from '../screens/Cadastros/Caminhao';
import {CaminhaoForm} from '../screens/Cadastros/Caminhao/CaminhaoForm'

//Carga
import { Carga } from '../screens/Cadastros/Cargas';
import {CargaForm} from '../screens/Cadastros/Cargas/CargaForm';

//Carreta
import { Carreta } from '../screens/Cadastros/Carreta';
import {CarretaForm} from '../screens/Cadastros/Carreta/CarretaForm';

//Empregadora
import { Empregadora } from '../screens/Cadastros/Empregadora';
import {EmpregadoraForm} from '../screens/Cadastros/Empregadora/EmpregadoraForm';

//Manutenção
import { Manutencao } from '../screens/Cadastros/Manutencao';
import { ManutencaoForm } from '../screens/Cadastros/Manutencao/ManutencaoForm';


const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{
          headerShown: false,
          
        }}
      />

      <Stack.Screen
        name="ViagemForm"
        component={ViagemForm}
        options={{ title: 'Viagem', headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerShadowVisible:false,
          headerTitleStyle: {
            fontWeight: 'bold',
          }}}
      />

      <Stack.Screen
        name="Pedagio"
        component={Pedagio}
        options={{ title: 'Pedágio', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="PedagioForm"
        component={PedagioForm}
        options={{ title: 'Pedágio', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

       <Stack.Screen
        name="Abastecimento"
        component={Abastecimento}
        options={{ title: 'Abastecimento', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="AbastecimentoForm"
        component={AbastecimentoForm}
        options={{ title: 'Abastecimento', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="Caminhao"
        component={Caminhao}
        options={{ title: 'Caminhão', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CaminhaoForm"
        component={CaminhaoForm}
        options={{ title: 'Caminhão', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="Carga"
        component={Carga}
        options={{ title: 'Carga', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CargaForm"
        component={CargaForm}
        options={{ title: 'Carga', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="Carreta"
        component={Carreta}
        options={{ title: 'Carreta', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="CarretaForm"
        component={CarretaForm}
        options={{ title: 'Carreta', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="Empregadora"
        component={Empregadora}
        options={{ title: 'Empregadora', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="EmpregadoraForm"
        component={EmpregadoraForm}
        options={{ title: 'Empregadora', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="Manutencao"
        component={Manutencao}
        options={{ title: 'Manutenção', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />

      <Stack.Screen
        name="ManutencaoForm"
        component={ManutencaoForm}
        options={{ title: 'Manutenção', headerStyle: {
            backgroundColor: theme.colors.backgroundCard
          },
          headerShadowVisible:false,
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}
      />
    </Stack.Navigator>
  );
}
