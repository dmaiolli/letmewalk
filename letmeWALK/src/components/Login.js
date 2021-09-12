import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { readByKey } from '../database/DbUtils';

const Login = (props) => {
  let [user, onChangeUser] = React.useState("");
  let [password, onChangePassword] = React.useState("");

  return (

    <KeyboardAvoidingView
      enabled
      behavior="padding">
      <ScrollView>
        <View style={styles.container}>

          <Image style={{ alignSelf: "center" }} source={require('../assets/Component.png')} />

          <Text style={styles.text}>Usuário</Text>
          <TextInput style={styles.input} value={user} onChangeText={onChangeUser} />

          <Text style={styles.text}>Senha</Text>
          <TextInput label="Senha" style={styles.input} secureTextEntry={true} value={password} onChangeText={onChangePassword} />

          <TouchableOpacity value="Login" style={[styles.button, styles.buttonPrimary]} onPress={() => {

            if (!user.trim() || !password) {
              alert('Preencha os campos corretamente')
              return
            }

            readByKey(user, (error, value) => {
              if (error || !value) {
                alert('Não foi possível encontrar o usuário');
                return
              }

              const result = JSON.parse(value);

              if (result.user === user && result.password === password) {
                props.navigation.navigate('home', {
                  user: result
                });
              } else {
                alert('Usuário ou senha inválido')
              }
            })
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