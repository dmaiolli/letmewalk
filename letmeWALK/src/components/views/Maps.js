import React, { useEffect, useRef } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
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
            let location = await RNLocation.getLatestLocation({ timeout: 100, })
            setOrigin({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            })
        } else {
            throw new Error('Location permission not granted')
        }
    }, [])

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


    const sendLocation = async () => {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        setViewLocation(location)
    }

    return (
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
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
            >
                {destination && (

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
                        }}
                    />
                )}
            </MapView>

            <View>
                <Text>Distancia: {distance} km</Text>
            </View>
            <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
                <Button
                    title="Get Location"
                    onPress={permissionHandle}
                />
            </View>

            <Text>Latitude: {viewLocation.latitude}</Text>
            <Text>Longitude: {viewLocation.longitude}</Text>
            <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
                <Button
                    title="Botão pânico"
                    onPress={sendLocation}
                />
            </View>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 600
    },
})

export default Maps