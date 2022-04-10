import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
// import orderModel from "../models/orders.ts";

export default function DeliveryList({ route, navigation }) {
    console.log('DeliveryList.tsx');

    function form() {
        navigation.navigate("Form");

    };

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

    const backButton = <Button title='leverans' onPress={form} />;

    return (
        <View style={Base.orderButton}>
            <Text style={Typography.header3}>DELIVERIES LIST</Text>
            { backButton }
        </View>
    );
};
