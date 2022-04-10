import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
// import orderModel from "../models/orders.ts";

export default function DeliveryForm() {
    console.log('DeliveryForm.tsx');

    // const [allDeliveries, setAllDeliveries] = useState([]);
    //
    // useEffect(() => {
    //     (async () => {
    //         const orders = await orderModel.getOrders();
    //         setAllOrders(orders);
    //     })();
    // }, []);

    // useEffect(() => {
    //     console.log('inne i useeffect');
    //     reloadOrders();
    // }, []);


    // const listOfOrders = allOrders
    //     .filter(order => order.status === "Ny")
    //     .map((order, index) => {
    //         return (
    //             <View key={index} style={Base.buttonSpace}>
    //             <Button
    //                 title={order.name}
    //                 onPress={() => {
    //                     navigation.navigate('Details', {
    //                         order: order
    //                 });
    //             }} />
    //             </View>
    //         );
    //     });

    return (
        <View style={Base.orderButton}>
            <Text style={Typography.header3}>DELIVERIES FORM</Text>
        </View>
    );
};
