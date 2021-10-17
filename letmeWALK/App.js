import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Contato from './src/components/views/Contato';
import Login from './src/components/views/Login';
import Register from './src/components/views/Register';
import Home from './src/components/views/Home';
import AddContato from './src/components/views/AddContato';
import Maps from './src/components/views/Maps';
import Teste from './src/components/views/Testes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#321D5F'
        }}>

        {/* <Stack.Screen
          name="teste"
          component={Teste}
          options={{
            title: 'Lista contatos',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} /> */}

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
          name="login"
          component={Login}
          options={{
            title: 'Faça seu login',
            headerStyle: {
              backgroundColor: '#321D5F'
            },
            headerTintColor: '#FFF'
          }} />
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
          options={{
            title: 'Home'
          }}
          component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;