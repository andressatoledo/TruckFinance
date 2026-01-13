import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { ViagemForm } from '../screens/Viagem/ViagemForm';
import BottomTabs from './bottomTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator>

     <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="ViagemForm"
        component={ViagemForm}
        options={{ title: 'Viagem' }}
      />

    </Stack.Navigator>
  );
}

