import { Text, Button, ScrollView, View } from 'react-native';
import { DataTable } from "react-native-paper";
import { Base, Typography } from '../../styles'

export default function OneInvoice({route, navigation}) {
    const { invoice } = route.params;
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header4}> faktura id: {invoice.id}</Text>

        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Namn</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row key='name'>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Header>
                <DataTable.Title>Adress</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row key='address'>
                <DataTable.Cell>{invoice.address}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Header>
                <DataTable.Title>Postnr</DataTable.Title>
                <DataTable.Title>Stad</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row key='city'>
                <DataTable.Cell>{invoice.zip}</DataTable.Cell>
                <DataTable.Cell>{invoice.city}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Header>
                <DataTable.Title>Summa</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row key='total'>
                <DataTable.Cell>{invoice.total_price} kr</DataTable.Cell>
            </DataTable.Row>
        </DataTable>

        </ScrollView>

    );
};
