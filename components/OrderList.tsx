import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";

export default function OrderList({ navigation }) {
    const [allOrders, setAllOrders] = useState([]);

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
        <View>
            <Text>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
