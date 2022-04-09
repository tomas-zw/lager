import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base } from '../styles';
import orderModel from "../models/orders.ts";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    useEffect(() => {
        (async () => {
            const orders = await orderModel.getOrders();
            setAllOrders(orders);
        })();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.orderButton}>
            <Text>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
