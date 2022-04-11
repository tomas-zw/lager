import { useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';

import deliveryModel from "../models/deliveries.ts";
import Delivery from '../interfaces/delivery'

export default function DeliveryList({ route, navigation, deliveries, setDeliveries }) {

    function form() {
    navigation.navigate("Form");
    };

    useEffect(() => {
        (async () => {
            const allDeliveries = await deliveryModel.getDeliveries();
            setDeliveries(allDeliveries);
        })();
    }, []);

    const listOfDeliveries = deliveries
        .map((delivery: Delivery, index: number) => {
            return (
                <View key={index} style={Base.textSquare}>
                    <Text style={Typography.header3}>
                        {delivery.amount} st {delivery.product_name}
                    </Text>
                    <Text style={Typography.normal}>
                        Levererad: {delivery.delivery_date}
                    </Text>
                    <Text style={Typography.normal}>
                        Kommentar: {delivery.comment}
                    </Text>
                </View>
            );
        });

    const goToForm = <Button title='Ny leverans' onPress={form} />;

    return (
        <View style={Base.orderButton}>
            { listOfDeliveries }
            { goToForm }
        </View>
    );
};
