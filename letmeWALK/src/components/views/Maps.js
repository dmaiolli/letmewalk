import React, { useEffect, useRef } from "react"
import { Alert, Button, StyleSheet, Text, View } from "react-native"
import MapView, { MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps'
import RNLocation from 'react-native-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapViewDirections from 'react-native-maps-directions'
import { useState } from "react/cjs/react.development"
import config from '../../../config'

RNLocation.configure({
  distanceFilter: 5.0
})

const Maps = () => {

  const mapEl = useRef(null)
  const [viewLocation, setViewLocation] = useState([])
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [distance, setDistance] = useState(null)


  useEffect(async () => {
    const status = permissionHandle()

    if (status) {
      getLocation()
    } else {
      throw new Error('Location permission not granted')
    }
  }, [])

  const getLocation = async () => {
    let location = await RNLocation.getLatestLocation({ timeout: 100, })
    setOrigin({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    console.log(location);
  }

  const permissionHandle = async () => {
    const permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    })

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      })
      return permission
    }
  }


  // const sendLocation = async () => {
  //   location = await RNLocation.getLatestLocation({ timeout: 100 })
  //   setViewLocation(location)
  // }

  return (
    <View>
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
              color: 'black',
              zIndex: 1000,
              position: 'absolute',
              top: 45
            },
          }}
        />
      </View>

      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={origin}
          showsUserLocation={true}
          loadingEnabled={true}
          ref={mapEl}
          onUserLocationChange={(coordinate) => {
            setOrigin({
              latitude: coordinate.nativeEvent.coordinate.latitude,
              longitude: coordinate.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.922,
              longitudeDelta: 0.421
            })
          }}
        >
          {destination && (
            <View>

              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={config.googleDirectionsApi}
                strokeWidth={3}
                onReady={result => {
                  setDistance(result.distance)
                  mapEl.current.fitToCoordinates(
                    result.coordinates, {
                    edgePadding: {
                      top: 50,
                      bottom: 50,
                      left: 50,
                      right: 50
                    }
                  }
                  )
                  alert('Distância de: ', distance)
                }}
              />
              <Text style={{ fontSize: 55, zIndex: 50 }}>Distância: {distance}</Text>
            </View>
          )}
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: 600,
    marginTop: 45
  },
})

export default Maps