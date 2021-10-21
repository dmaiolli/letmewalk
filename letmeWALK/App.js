import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather';
import { Image } from 'react-native';

import Contato from './src/components/views/Contato';
import Login from './src/components/views/Login';
import Register from './src/components/views/Register';
import Home from './src/components/views/Home';
import AddContato from './src/components/views/AddContato';
import Maps from './src/components/views/Maps';
import SearchLocation from './src/components/views/SearchLocation';
import DescricaoContato from './src/components/views/DescricaoContato';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#321D5F'
        }}>
        <Stack.Screen
          name="login"
          component={Login}
          options={({ navigation }) => ({
            title: 'Faça seu login',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTitle: () => <Image source={require("./src/assets/HeaderTitle.png")} style={{ transform: [{ scale: 1.5 }] }} />,
          })} />

        <Stack.Screen
          name="addContato"
          component={AddContato}
          options={{
            title: 'Adicione contatos',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} />

        <Stack.Screen
          name="maps"
          component={Maps}
          options={{
            title: 'Mapa',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} />

        <Stack.Screen
          name="searchLocation"
          component={SearchLocation}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#321D5F',
            },
            headerTitle: props => <Image source={require("./src/assets/HeaderTitle.png")} style={{ transform: [{ scale: 1.5 }] }} />,
          })}
        />

        <Stack.Screen
          name="descricaoContato"
          component={DescricaoContato}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#321D5F',
            },
            headerTitle: props => <Image source={require("./src/assets/HeaderTitle.png")} style={{ transform: [{ scale: 1.5 }] }} />,
          })}
        />

        <Stack.Screen
          name="contato"
          component={Contato}
          options={{
            title: 'Lista contatos',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} />

        <Stack.Screen
          name="register"
          component={Register}
          options={{
            title: 'Cadastre-se',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} />

        <Stack.Screen
          name="home"
          options={({ navigation }) => ({
            title: 'Home',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerBackTitleStyle: {
              color: 'white'
            },
            headerTintColor: '#FFF',
            headerTitle: props => <Image source={require("./src/assets/HeaderTitle.png")} style={{ transform: [{ scale: 1.5 }] }} />,
          })}
          component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;