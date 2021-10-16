import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { readAll } from "../../database/DbUtils";
import ListContactItem from "../ListContactItem";

const Contato = (props) => {

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const teste = readAll();
        console.log(teste);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Meus contatos</Text>
                <View style={styles.contacts}>
                    {contacts === null && (
                        // TODO se contatos vazio
                        <Text>Teste</Text>
                    )}

                    <FlatList
                        data={contacts}
                        keyExtractor={(contact) => contact.id}
                        renderItem={({ item }) => <ListContactItem contact={item} />} />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.navigate("addContato")
                    }}>
                    <Text style={{ flex: 1 }}>Novo contato</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#321D5F',
        flex: 1
    },
    content: {
        padding: 16,
        height: 500
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#FFF"
    },
    contacts: {
        backgroundColor: "#FFF",
        opacity: 0.12,
        height: 200,
        borderRadius: 8
    },
    button: {
        width: 370,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#321D5F",

    },
})

export default Contato;