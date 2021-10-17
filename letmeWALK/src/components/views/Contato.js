import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearDatabase, insertObject, readAll, readByKey } from "../../database/DbUtils";
import ListContactItem from "../ListContactItem";

const Contato = (props) => {
    const { user } = props.route.params || '';
    const [userLogged, setUserLogged] = useState()
    const [contacts, setContacts] = useState(
        [
            // {
            //     id: 1,
            //     name: "Denys",
            //     celphone: "119"
            // },
            // {
            //     id: 2,
            //     name: "Denys",
            //     celphone: "119"
            // },
        ]
    )

    const getContacts = () => {
        setUserLogged(user);
        const userJson = JSON.parse(user)
        readByKey(userJson.email, (error, value) => {
            if (error || !value) {
                return
            }
            setContacts(userJson.contatos)
        })
    }

    const removeItem = (contactId) => {
        try {
            let userJSON = JSON.parse(userLogged);
            let alteredUsers = Object.values(userJSON.contatos).filter(e => e.id !== contactId)
            userJSON.contatos.push(alteredUsers)
            insertObject(userJSON.email, JSON.stringify(userJSON));
            setUserLogged(alteredUsers)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContacts()
    })

    const renderItem = ({ item }) => {
        return (
            <View style={styles.line}>
                <Text style={styles.descContato}>
                    {item.name} - {item.celNumber}
                </Text>
                <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() => {
                        removeItem(item.id)
                    }}>
                    <Icon name="add-task" style={{ paddingLeft: 10, paddingRight: 10 }} size={20} color="red" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Meus contatos</Text>
                <View style={styles.contacts}>
                    {contacts === null && (
                        // TODO se contatos vazio
                        <Text style={styles.title}>Teste</Text>
                    )}

                    {/* <ListContactItem contact={item} user={userLogged} /> */}

                    <FlatList
                        data={contacts}
                        keyExtractor={(contact) => contact.id}
                        renderItem={renderItem} />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.navigate("addContato", {
                            user
                        })
                    }}>
                    <Text>Novo contato</Text>
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
        backgroundColor: "#0FF",
    },
    buttonRemove: {
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
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        alignContent: "space-between"
    },
    descContato: {
        fontSize: 24
    }
})

export default Contato;