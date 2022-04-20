import { useState, useEffect } from 'react';
import { Text, ScrollView, Button, View } from 'react-native';
import { DataTable } from "react-native-paper";

import { Base, Typography } from '../../styles'
import invoiceModel from "../../models/invoices";
import Invoice from '../../interfaces/invoice';

export default function AllInvoices({route, navigation, setIsLoggedIn }) {
    // console.log('Home.tsx');
    const { reload } = route.params || false;
    const [invoices, setInvoices] = useState<Partial<Invoice[]>>([]);

    if (reload) {
        console.log('reload');
        reloadInvoices();
        navigation.navigate('Fakturor', { reload: false })
    };

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
        // navigation.navigate("List", { reload: false });
    };

    useEffect(() => {
        reloadInvoices();
    }, []);

    console.log(invoices);
    const list = invoices.map((invo, index) => {
        return (
            <DataTable.Row key={index}
                onPress={() => {
                    navigation.navigate('En Faktura', {invoice: invo});
                }}>
                <DataTable.Cell>{invo.name}</DataTable.Cell>
                <DataTable.Cell>{invo.total_price}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    const table = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Kund</DataTable.Title>
                    <DataTable.Title>Summa</DataTable.Title>
                </DataTable.Header>
                { list }
            </DataTable>
            );

    };

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}>Fakturor</Text>

            { table() }

            <View style={Base.buttonSpace}>
                <Button
                    title='Ny faktura'
                    onPress={() => {
                        navigation.navigate('Skapa');
                    }}
                />
            </View>

            <View style={Base.buttonSpace}>
                <Button
                    title='Logga ut'
                    onPress={() => {
                        setIsLoggedIn(false);
                    }}
                />
            </View>
        </ScrollView>
    );
}
