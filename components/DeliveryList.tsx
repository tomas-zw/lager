import { useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';

import deliveryModel from "../models/deliveries.ts";
import Delivery from '../interfaces/delivery'

export default function DeliveryList({ route, navigation, deliveries, setDeliveries }) {

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

    const goToForm = <Button
        title='Ny leverans'
        onPress={ () => {
            navigation.navigate('Form');
        }}
        />;

    return (
        <View style={Base.base}>
            <Text style={Typography.header3}> Leveranser </Text>
            <ScrollView>
            { listOfDeliveries }
            </ScrollView>
            { goToForm }
        </View>
    );
};
