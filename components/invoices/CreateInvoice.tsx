import { useState, useEffect } from 'react';
import { Text, ScrollView, Button, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { DataTable } from "react-native-paper";

import { Base, Typography, Forms } from '../../styles'
import orderModel from '../../models/orders.ts';
import invoiceModel from '../../models/invoices';
import Order from '../../interfaces/order';

function InvoiceTable({ invoice, setInvoice, order }) {
    let sum = 0;

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

function ProductDropDown(props) {
    const [allOrders, setAllOrders] = useState([]);
    let orderHash: any = {};

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
        console.log('reload i invoice');
    };

    useEffect(() => {
        reloadOrders();
    }, []);


    const orderList = allOrders
        .filter(order => order.status === "Skickad")
        .map((order, index) => {
        orderHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.currentOrder?.id}
            onValueChange={(itemValue) => {
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

    useEffect(() => {
        if (currentOrder) {
            console.log('use');
            let sum = 0;
            currentOrder.order_items.map((item) => {
                sum += item.amount * item.price;
            });
            setInvoice({ ...invoice,
                total_price: sum,
                order_id: currentOrder.id,
                name: currentOrder.name
            });
        }
    }, [currentOrder]);

    const isOrder = () => {
        if (currentOrder) {
            return (
                <View>
                    <Text style={Typography.normal}>{currentOrder.address}</Text>
                    <Text style={Typography.normal}>{currentOrder.zip} {currentOrder.city}</Text>
                    <Text style={Typography.normal}>{currentOrder.country}</Text>
                <InvoiceTable
                    invoice={invoice}
                    setInvoice={setInvoice}
                    order={currentOrder}
                />
                </View>
            );
        }
        return (
            <Text></Text>
            );
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Order</Text>

            <View style={Forms.pickerInput}>
                <ProductDropDown
                    invoice={invoice}
                    setInvoice={setInvoice}
                    currentOrder={currentOrder}
                    setCurrentOrder={setCurrentOrder}
                />
            </View>

            { isOrder() }

            <View style={Base.buttonSpace}>
                <Button
                    title='Skapa faktura'
                    onPress={() => {
                        invoiceModel.addInvoice(invoice);
                        navigation.navigate('Fakturor', { reload: true});
                    }}
                />
            </View>

        </ScrollView>
    );
};
