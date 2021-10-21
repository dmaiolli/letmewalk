import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { deleteContato, update } from "../../services/ContatoService";

const DescricaoContato = (props) => {
  const { user, id, nome, ddd, telefone } = props.route.params

  const [novoNome, setNome] = useState(nome)
  const [novoTelefone, setTelefone] = useState(`${telefone}`)
  const [novoDDD, setDDD] = useState(`${ddd}`)

  useEffect(() => {
    console.log(novoTelefone);
  })

  const validar = () => {
    if (!novoNome.trim() || !novoTelefone.trim() || !novoDDD.trim()) {
      alert('Preencha todos dados corretamente')
      return false
    }
    if (novoDDD.length > 2 || novoDDD.length <= 1) {
      alert('Preencha o DDD com apenas 2 digitos')
      return false
    }
    if (novoTelefone.length < 9 || novoTelefone.length > 9) {
      alert('O telefone deve ter 9 digitos')
      return false
    }
    return true
  }

  const salvarAlteracoes = () => {
    if (validar()) {
      update(user.id, id, novoNome, novoDDD, novoTelefone).then(() => {
        props.navigation.navigate('contato', {
          user
        })
      })
    }
  }

  const removerContato = () => {
    deleteContato(id).then(() => {
      props.navigation.navigate('contato', {
        user
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={novoNome} onChangeText={(text) => setNome(text)} />

      <Text style={styles.label}>DDD</Text>
      <TextInput keyboardType='numeric' style={styles.input} value={novoDDD} onChangeText={(text) => setDDD(text)} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput keyboardType='numeric' style={styles.input} value={novoTelefone} onChangeText={(text) => setTelefone(text)} />

      <Button title='Salvar' onPress={() => {
        salvarAlteracoes()
      }} />
      <Button title='Remover' onPress={() => {
        removerContato()
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold'
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
})

export default DescricaoContato