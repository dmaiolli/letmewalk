import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { insertObject, readAll, readByKey, clearDatabase } from '../database/DbUtils';

const Home = (props) => {
  const { user } = props.route.params || '';

  const [isUserFiap, setUserFiap] = useState(false);

  useEffect(() => {
    if (user.user === 'fiap') setUserFiap(true);
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao LetmeWalk {user.user} !!!</Text>

      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.goBack();
      }}>
        <Text style={styles.buttonText}>Logout</Text>
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