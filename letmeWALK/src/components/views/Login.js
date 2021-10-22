import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { findByEmail } from '../../services/UserService';

const Login = (props) => {
  const [user, setUser] = useState()
  const [userLogged, setUserLogged] = useState(null)
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const onAuthStateChanged = (user) => {
    setUser(user);
  }

  const getActualUser = (email) => {
    findByEmail(email).then((response) => setUserLogged(response.data))
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  const login = async (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        getActualUser(email)
        props.navigation.navigate('home', {
          email: user.email
        })
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') alert('Email/senha inválido')
        if (error.code === 'auth/wrong-password') alert('Email/senha inválido')
      })
  }

  return (

    <KeyboardAvoidingView
      enabled
      behavior="padding">
      <ScrollView>
        <View style={styles.container}>

          <Image style={{ alignSelf: "center" }} source={require('../../assets/Component.png')} />

          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={onChangeEmail} />

          <Text style={styles.text}>Senha</Text>
          <TextInput label="Senha" style={styles.input} secureTextEntry={true} value={password} onChangeText={onChangePassword} />

          <TouchableOpacity value="Login" style={[styles.button, styles.buttonPrimary]} onPress={() => {
            // readByKey(email, (error, value) => {
            //   if (error || !value) {
            //     alert('Não foi possível encontrar o usuário');
            //     return
            //   }

            //   if (!email.trim() || !password) {
            //     alert('Preencha os campos corretamente')
            //     return
            //   }

            // })
            login(email, password)
          }}>
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity value="Register" style={[styles.button, styles.buttonSecondary]} onPress={() => {
            props.navigation.navigate('register');
          }}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    color: '#000',
    fontSize: 20
  },
  input: {
    width: 370,
    borderRadius: 8,
    borderBottomColor: "#000",
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 15,
    fontSize: 15,
    marginTop: 5
  },
  button: {
    width: 370,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5
  },
  buttonText: {
    fontSize: 17
  },
  buttonTextPrimary: {
    color: "#CCC"
  },
  buttonTextSecondary: {
    color: "#000",
  },
  buttonSecondary: {
    backgroundColor: "#FFF",
    borderColor: "#321D5F",
    borderWidth: 2
  },
  buttonPrimary: {
    backgroundColor: "#321D5F",
  }
})

export default Login;