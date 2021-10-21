import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from '../../../config'

const SearchLocation = (props) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={5} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
          })
        }}
        getDefaultValue={() => {
          return ''
        }}
        query={{
          key: config.googleDirectionsApi,
          language: 'pt-br'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            color: 'black', //To see where exactly the list is
            zIndex: 1000, //To popover the component outwards
            position: 'absolute',
            top: 45
          },
        }}
      />
    </View>

  )
}

export default SearchLocation;