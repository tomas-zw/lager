import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders.ts";

export default function OrderList({ route, navigation }) {

    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    };

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
        navigation.navigate("List", { reload: false });
        console.log('inne i reloadOrders');
    };

    useEffect(() => {
        reloadOrders();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const orders = await orderModel.getOrders();
    //         setAllOrders(orders);
    //     })();
    // }, []);



    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return (
                <View key={index} style={Base.buttonSpace}>
                <Button
                    title={order.name}
                    onPress={() => {
                        navigation.navigate('Details', {
                            order: order
                    });
                }} />
                </View>
            );
        });

    return (
        <View style={Base.orderButton}>
            <Text style={Typography.header3}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
};
