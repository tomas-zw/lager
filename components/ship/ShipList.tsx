import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import { Base, Typography } from '../../styles';

import Order from '../../interfaces/order';
import orderModel from '../../models/orders'


export default function ShipList({ route, navigation }) {
    const [orders, setOrders] = useState<Partial<Order[]>>([]);

    useEffect(() => {
        (async () => {
            setOrders(await orderModel.getOrders())
        })();
    }, []);

    const packedOrders = orders
        .filter(order => order.status ==='Packad')
        .map((order, index) => {
            return (
                <View key={index} style={Base.buttonSpace}>
                <Button
                    title={order.name}
                    onPress={() => {
                        navigation.navigate('Location', {
                            order: order
                    });
                }} />
                </View>
            );
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}> Packade ordrar </Text>
            { packedOrders }
        </ScrollView>
    );

};
