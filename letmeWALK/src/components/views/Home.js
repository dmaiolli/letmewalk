import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { findByEmail } from '../../services/UserService';
import auth from '@react-native-firebase/auth';

const Home = (props) => {
  const { email } = props.route.params || '';
  let user = null;

  const getUser = () => {
    findByEmail(email)
      .then(res => user = res.data)
      .catch(err => alert(err))
  }

  useEffect(() => {
    getUser()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao LetmeWalk !!!</Text>

      <TouchableOpacity style={styles.button} onPress={() => {
        auth()
          .signOut()
          .then(() => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'login' }]
            })
          })
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.navigate('contato', {
          user
        });
      }}>
        <Text style={styles.buttonText}>Adicionar contatos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.navigate('maps', {
          user
        });
      }}>
        <Text style={styles.buttonText}>Rotas</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  button: {
    width: 370,
    height: 50,
    backgroundColor: "#321D5F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginBottom: 15
  },
})

export default Home;