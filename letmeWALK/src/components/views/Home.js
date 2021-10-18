import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { insertObject, readAll, readByKey, clearDatabase } from '../../database/DbUtils';

const Home = (props) => {
  const { email } = props.route.params || '';
  const [userLogged, setUserLogged] = useState();

  async function getUserLogged() {
    await readByKey(email, (error, value) => setUserLogged(value))
  }

  useEffect(() => {
    getUserLogged()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao LetmeWalk !!!</Text>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.goBack();
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.navigate('contato', {
          user: userLogged
        });
      }}>
        <Text style={styles.buttonText}>Adicionar contatos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.navigate('maps', {
          user: userLogged
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