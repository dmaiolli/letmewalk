import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { findAllByUserId } from "../../services/ContatoService";

const Contato = (props) => {
  const { user } = props.route.params || '';
  const [contacts, setContacts] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getContacts = () => {
    setIsRefreshing(true)
    findAllByUserId(user.id)
      .then(response => {
        setContacts(response.data)
      })
      .finally(() => setIsRefreshing(false))
  }

  const abrirDescricaoContato = (id, nome, ddd, telefone) => {
    props.navigation.navigate('descricaoContato', { user, id, nome, ddd, telefone })
  }

  useEffect(() => {
    getContacts()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.line}>
        <Text style={styles.descContato} acessible={true}>
          {item.nome} - {item.telefone}
        </Text>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Editar contato"
          accessibilityHint="Navega para uma tela para editar o contato selecionado"
          accessibilityRole="button"
          style={styles.buttonDescricaoContato}
          onPress={() => abrirDescricaoContato(item.id, item.nome, item.ddd, item.telefone)}>
          <Icon name="system-update-alt" style={{ paddingLeft: 10, paddingRight: 10 }} size={20} color="gray" />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}
        accessible={true}
        accessibilityLabel="Lista de contatos salvos"
      >
        <Text style={styles.title}>Meus contatos</Text>
        <View style={styles.contacts}>
          {contacts.length === 0 && (
            <Image style={{ alignSelf: 'center', transform: [{ scale: 1.5 }], marginTop: 50 }} source={require("../../assets/empty-list.png")} />
          )}

          <FlatList
            data={contacts}
            keyExtractor={(contact) => contact.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                onRefresh={() => getContacts()}
                refreshing={isRefreshing} />
            } />
        </View>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Adicionar contato"
          accessibilityHint="Adiciona um novo contato"
          accessibilityRole="button"
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("addContato", {
              user
            })
          }}>
          <Text style={styles.buttonText}>Novo contato</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  content: {
    padding: 16,
    height: 500
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#321D5F"
  },
  contacts: {
    backgroundColor: "#6F53AC",
    height: 500,
    borderRadius: 8
  },
  button: {
    width: 380,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#321D5F",
  },
  buttonText: {
    color: "#FFF"
  },
  buttonDescricaoContato: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#0FF",
    alignSelf: 'flex-end'
  },
  line: {
    flexDirection: "row",
    width: 380,
    height: 50,
    backgroundColor: '#6F53AC',
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 8
  },
  descContato: {
    fontSize: 24
  }
})

export default Contato;