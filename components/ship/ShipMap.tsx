import { useState, useEffect} from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import { Base, Typography } from '../../styles';
import getCoordinates from '../../models/nominatim';


export default function ShipMap({ route}) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [shipmentRegion, setShipmentRegion] = useState({
        latitude: 60.128161,
        longitude: 15.5869,
        latitudeDelta: 10,
        longitudeDelta: 0.1,
    })
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={order.address}
                />);

            setShipmentRegion({
                latitude: parseFloat(results[0].lat),
                longitude: parseFloat(results[0].lon),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,

            })
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);
    const list = order.order_items.map((item, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.amount}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <View style={Base.base}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Kund</DataTable.Title>
                    <DataTable.Title>Address</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>{order.name}</DataTable.Cell>
                    <DataTable.Cell>{order.address}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Produkt</DataTable.Title>
                    <DataTable.Title>Antal</DataTable.Title>
                </DataTable.Header>
                    { list }
            </DataTable>
            <Text style={Typography.normal}> { errorMessage }</Text>
            <View style={Base.mapContainer}>
                <MapView
                    style={Base.map}
                    initialRegion={ shipmentRegion }>
                    { marker }
                    { locationMarker }
                    </MapView>
            </View>
        </View>
    );

};
