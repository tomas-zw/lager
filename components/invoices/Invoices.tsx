import { useState, useEffect } from 'react';
import { Text, ScrollView, Button, View } from 'react-native';
import { DataTable } from "react-native-paper";

import { Base, Typography } from '../../styles'
import invoiceModel from "../../models/invoices";
import Invoice from '../../interfaces/invoice';

export default function AllInvoices({ navigation, setIsLoggedIn }) {
    // console.log('Home.tsx');
    const [invoices, setInvoices] = useState<Partial<Invoice[]>>([]);

    useEffect(async () => {
      setInvoices(await invoiceModel.getInvoices());
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
                    title='Skapa faktura'
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
