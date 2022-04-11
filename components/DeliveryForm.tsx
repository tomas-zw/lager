import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from "react-native";
import { Base, Typography } from '../styles';
// import orderModel from "../models/orders.ts";

export default function DeliveryForm({ route, navigation }) {
    console.log('DeliveryForm.tsx');

    const [productId, setProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    function list() {
        navigation.navigate("List");
    };

    const goToList = <Button title='Skapa leverans' onPress={list} />;


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
            <Text style={Typography.header3}>Gör en leverans </Text>
            <TextInput
                style={Base.textInput}
                onChangeText={setProductId}
                value={productId}
                keyboardType="numeric"
                placeholder='product id'
            />
            <TextInput
                style={Base.textInput}
                keyboardType='numeric'
                placeholder='Antal'
            />
            <TextInput
                style={Base.textInput}
                keyboardType="numeric"
                placeholder='Datum'
            />
            { goToList }
        </View>
    );
};
