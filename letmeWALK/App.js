import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/Login';
import Home from './src/components/Home';
import Register from './src/components/Register';

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
          options={{
            title: 'Faça seu login',
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