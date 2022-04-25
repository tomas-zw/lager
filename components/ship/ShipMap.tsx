import { ScrollView, View, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

import { Base, Typography } from '../../styles';


export default function ShipMap({ route, navigation }) {
    const { order } = route.params;

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
            <View style={Base.mapContainer}>
                <MapView
                    style={Base.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    <Marker
                        coordinate={{ latitude: 56.17, longitude: 15.59 }}
                        title={order.address}
                    />
                    </MapView>
            </View>
        </View>
    );

};
