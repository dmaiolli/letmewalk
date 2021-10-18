import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Icon } from 'react-native-elements'
import { useEffect, useState } from 'react/cjs/react.development'
import { removeItemValue } from '../../database/DbUtils'

const ListContactItem = (props) => {
    const [userLogged, setUserLogged] = useState()

    useEffect(() => {
        console.log(props.user);
    })

    const removeItem = (contactId) => {
        const user = props.user;
        try {
            let userJSON = JSON.parse(user);
            alteredUsers = usersArray.filter(e => {
                return e.contatos.id !== contactId
            })
            AsyncStorage.setItem(userJSON.email, JSON.stringify(alteredUsers));
            setUserLogged(alteredUsers)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text style={estilos.titulo}>
                {props.contact.name} - {props.contact.celNumber}
            </Text>
            <TouchableOpacity
                style={estilos.button}
                onPress={() => {
                    removeItem(props.contact.id)
                }}>
                <Icon name="trash" style={{ paddingLeft: 10, paddingRight: 10 }} size={20} color="red" />
            </TouchableOpacity>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 2,
        flexDirection: 'row',
        padding: 8
    },
    icon: {
        height: 60,
        marginRight: 8,
        width: 40
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFF"
    },
    button: {
        width: 370,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#321D5F",
    }
})

export default ListContactItem;