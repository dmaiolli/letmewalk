import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { insertObject, readByKey } from '../../database/DbUtils';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { create as createUserApi } from '../../services/UserService';

const Login = (props) => {
  const [user, setUser] = React.useState("");
  const [initializing, setInitializing] = React.useState(true)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [endereco, setEndereco] = React.useState({})

  const buscarCEP = async () => {
    if (cep.length === 8) {
      await axios.get(`https://api.pagar.me/1/zipcodes/${cep}`)
        .then(response => setEndereco(response.data))
        .catch(error => {
          alert('o CEP é inválido')
        })
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email));
  }

  const validar = () => {
    if (!validateEmail(email)) {
      alert('Este não é um email válido')
      return false
    }

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      alert('Cadastre todos campos corretamente')
      return false
    }

    if (password !== confirmPassword) {
      alert('A confirmação de senha está errada')
      return false
    }

    if (!cep || cep.length < 8) {
      alert('o CEP é inválido')
      return false
    }
    return true
  }

  const createUserDB = () => {
    const user = createUserApi(username, email, password, endereco.state, endereco.city, endereco.neighborhood, endereco.street, '0', endereco.zipcode)
  }

  const createUser = (email, password) => {
    if (validar()) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          createUserDB()
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }

          if (error.code === 'auth/weak-password') {
            alert('A senha não é forte o suficiente')
          }

        })
      return true
    }
    return false
  }

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    buscarCEP()
  }, [cep])

  return (
    <KeyboardAvoidingView
      enabled
      behavior="padding">
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastre-se</Text>

          <Text style={styles.text}>Usuário</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />

          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.text}>CEP</Text>
          <TextInput style={styles.input} value={cep} onChangeText={setCep} />

          <Text style={styles.text}>Senha</Text>
          <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />

          <Text style={styles.text}>Confirme a senha</Text>
          <TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />

          <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => {

            const statusCreateUser = createUser(email, password);
            if (statusCreateUser) {
              alert('Usuário criado com sucesso')
              props.navigation.navigate('login')
            }

          }}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    borderColor: "#000",
    backgroundColor: '#FFF',
    borderWidth: 1,
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
    color: "#FFF",
    fontSize: 17
  },
  buttonSecondary: {
    backgroundColor: "#FFF",
    borderColor: "#4169e1",
    borderWidth: 2
  },
  buttonPrimary: {
    backgroundColor: "#321D5F"
  }
})

export default Login;