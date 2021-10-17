import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import RNLocation from 'react-native-location';
import { useState } from "react/cjs/react.development";

RNLocation.configure({
    distanceFilter: 5.0
})

const Maps = () => {

    const [viewLocation, setViewLocation] = useState([])
    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)

    useEffect(async () => {
        const status = permissionHandle();

        if (status) {
            let location = await RNLocation.getLatestLocation({ timeout: 100, })
            setOrigin({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
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
        });

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

            return permission;
        }
    }


    const sendLocation = async () => {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        setViewLocation(location)
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={origin}
                showsUserLocation={true}
                loadingEnabled={true}
            />
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
    },
});

export default Maps;