import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

const ListContactItem = (props) => {
    return (
        <View>
            <Text style={estilos.titulo}>
                {props.contact.name} - {props.contact.celNumber}
            </Text>

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
    }
})

export default ListContactItem;