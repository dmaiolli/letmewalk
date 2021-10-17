import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from '../../../config'

const Teste = () => {
    const [contacts, setContacts] = useState(
        [
            {
                id: 1,
                name: "Denys",
                celphone: "119"
            },
            {
                id: 2,
                name: "Denys",
                celphone: "119"
            },
        ]
    )

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>
                    Oi
                </Text>
            </View>
        )
    }

    return (
        <View>
            <GooglePlacesAutocomplete
                placeholder='Para onde vamos?'
                onPress={(data, details = null) => {
                    console.log(data, details);
                }}
                query={{
                    key: config.googleDirectionsApi,
                    language: 'pt-br',
                }}
                fetchDetails={true}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'grey',
                    },
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
        </View>
    )
}

export default Teste;