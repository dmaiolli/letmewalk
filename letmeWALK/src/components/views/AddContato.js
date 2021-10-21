import React, { useState } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { create } from "../../services/ContatoService";

const AddContato = (props) => {
  const { user } = props.route.params || '';
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ddd, setDDD] = useState('');

  const saveContact = () => {
    if (validar()) {
      const contato = create(nome, ddd, telefone, user.id).then(res => {
        props.navigation.navigate('contato', {
          user
        })
      })
    }
  }

  const validar = () => {
    if (!nome.trim() || !telefone.trim() || !ddd.trim()) {
      alert('Preencha todos dados corretamente')
      return false
    }
    if (ddd.length > 2 || ddd.length <= 1) {
      alert('Preencha o DDD com apenas 2 digitos')
      return false
    }
    if (telefone.length < 9 || telefone.length > 9) {
      alert('O telefone deve ter 9 digitos')
      return false
    }
    return true
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior="padding">
      <View style={{ padding: 16 }}>
        <Text style={styles.title}>Adicione um novo contato</Text>

        <Text style={styles.text}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.text}>DDD</Text>
        <TextInput style={styles.input} value={ddd} onChangeText={setDDD} />

        <Text style={styles.text}>Celular</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveContact();
          }}>
          <Text style={styles.buttonText}>Salvar contato</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: "bold",
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
    marginTop: 5,
    backgroundColor: "#321D5F"
  },
  buttonText: {
    color: "#FFF"
  }

})

export default AddContato;