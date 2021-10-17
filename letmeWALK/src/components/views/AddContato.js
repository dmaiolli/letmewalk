import React, { useState } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { insertObject, readByKey } from "../../database/DbUtils";

const AddContato = (props) => {
    const { user } = props.route.params || '';
    const [name, setName] = useState('');
    const [celNumber, setCelNumber] = useState('');
    let id = Date.now()

    const saveContact = (data) => {
        const userLogged = JSON.parse(user)
        userLogged.contatos.push(data)

        insertObject(userLogged.email, userLogged, (error) => {
            if (error) {
                alert('Tenha certeza que todas informações estão corretas')
                return
            }
        });
    }

    return (
        <KeyboardAvoidingView
            enabled
            behavior="padding">
            <View style={{ padding: 16 }}>
                <Text style={styles.title}>Adicione um novo contato</Text>

                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />


                <Text style={styles.text}>Celular</Text>
                <TextInput style={styles.input} value={celNumber} onChangeText={setCelNumber} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.navigate("contato", {
                            user
                        })
                        contactData = {
                            id,
                            name,
                            celNumber
                        }

                        saveContact(contactData);
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