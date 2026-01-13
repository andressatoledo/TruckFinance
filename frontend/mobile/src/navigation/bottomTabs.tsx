import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import {Viagem} from '../screens/Viagem';
import {Cadastros} from '../screens/Cadastros';
import { useTheme } from '../theme/themeContext';
import { useStyles } from './styles';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
type RootNav = NativeStackNavigationProp<RootStackParamList>;

export default function BottomTabs() {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation<RootNav>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.activeTab,
        tabBarInactiveTintColor: theme.colors.inactiveTab
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='home'
              size={theme.sizes.iconSize}
              color={focused ? theme.colors.activeTab : theme.colors.inactiveTab}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Viagem"
        component={Viagem}
        options={{
          tabBarLabel: "Viagem",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='truck'
              size={theme.sizes.iconSize}
              color={focused ? theme.colors.activeTab : theme.colors.inactiveTab}
            />
          ),
        }}
      />

      {/* BOTÃO CENTRAL */}
      <Tab.Screen
        name="Add"
        component={View} // componente vazio
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus"
              size={theme.sizes.iconSize}
              color={theme.colors.text} 
              style={{ marginTop: -2 }}
            />
          ),
          tabBarButton: () => (
            // <BotaoCentral
            //   styles={styles}
            //   onPress={() =>
            //     navigation.navigate('ViagemForm', {
            //       mode: 'create'
            //     })
            //   }
            // />
            <BotaoCentral
              styles={styles}
              onPress={() =>
                navigation.navigate('ViagemForm', { mode: 'create' })
              }
              children={
                <MaterialCommunityIcons
                  name="plus"
                  size={theme.sizes.iconSize}
                  color={theme.colors.text}
                />
              }
            />

          ),
        }}
      />

      <Tab.Screen
        name="Cadastros"
        component={Cadastros}
        options={{
          tabBarLabel: "Cadastros",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='format-list-bulleted'
              size={theme.sizes.iconSize}
              color={focused ? theme.colors.activeTab : theme.colors.inactiveTab}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Config"
        component={Viagem}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='cog'
              size={theme.sizes.iconSize}
              color={focused ? theme.colors.activeTab : theme.colors.inactiveTab}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



function BotaoCentral({ children, onPress, styles }: any) {
 
  return (
    <TouchableOpacity
      style={styles.botaoCentral}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.botaoInterno}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
