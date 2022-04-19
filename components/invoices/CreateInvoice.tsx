import { useState, useEffect } from 'react';
import { Text, ScrollView, Button, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { DataTable } from "react-native-paper";

import { Base, Typography } from '../../styles'
import orderModel from '../../models/orders.ts';
import Order from '../../interfaces/order';

function InvoiceTable({ invoice, setInvoice, order }) {
    let sum = 0;

    if (order){
        const table = order.order_items.map((item, index) => {
            const itemSum = item.amount * item.price;
            sum += itemSum;
            return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.amount}</DataTable.Cell>
                  <DataTable.Cell>{item.price}</DataTable.Cell>
                  <DataTable.Cell>{itemSum}</DataTable.Cell>
                </DataTable.Row>
            );
        });
    // setInvoice({ ...invoice, total_price: sum });

        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Produkt</DataTable.Title>
                    <DataTable.Title>Antal</DataTable.Title>
                    <DataTable.Title>Pris</DataTable.Title>
                    <DataTable.Title>Summa</DataTable.Title>
                </DataTable.Header>
                {table}
                <DataTable.Header>
                    <DataTable.Title>Totalt Pris</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row key='sum'>
                  <DataTable.Cell>{sum}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        );
    }

    return (
        <Text style={Typography.header1}>inget valt</Text>
    )

}

function ProductDropDown(props) {
    const [allOrders, setAllOrders] = useState([]);

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
        console.log('reload i invoice');
    };

    useEffect(() => {
        reloadOrders();
    }, []);

    let orderHash: any = {};

    const orderList = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
        orderHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice(
                    { ...props.invoice, order_id: itemValue ,
                       // total_price : orderHash[itemValue].name});
                       total_price : 100});
                props.setCurrentOrder(orderHash[itemValue]);
            }}>
            {orderList}
        </Picker>
    );
}


export default function Invoices({ setIsLoggedIn, navigation }) {
    const [invoice, setInvoice] = useState({});
    const [currentOrder, setCurrentOrder] = useState<Order>();

    console.log(invoice);

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Fakturor</Text>
            <View style={Base.buttonSpace}>
                <Button
                    title='Logga ut'
                    onPress={() => {
                        setIsLoggedIn(false);
                    }}
                />
            </View>

            <ProductDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                currentOrder={currentOrder}
                setCurrentOrder={setCurrentOrder}
            />

            <InvoiceTable
                invoice={invoice}
                setInvoice={setInvoice}
                order={currentOrder}
            />

        </ScrollView>
    );
}


