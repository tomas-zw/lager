import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Platform} from "react-native";
import { Base, Typography, Forms } from '../styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

import productModel from '../models/products'
import deliveryModel from '../models/deliveries'

import Delivery from '../interfaces/delivery'
import Product from '../interfaces/products'
import { showMessage } from 'react-native-flash-message';


function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };
    console.log(dropDownDate);

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    value={dropDownDate}
                    onChange={(event, date) => {
                        if (date !== undefined) {
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });
                        }
                        setShow(false);
                    }}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(async () => {
    //     // setProducts(await productModel.getProducts());
    //     props.setProducts(await productModel.getProducts());
    // }, []);
    let productsHash: any = {};


    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery(
                    { ...props.delivery, product_id: itemValue ,
                        product_name: productsHash[itemValue].name});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

export default function DeliveryForm({ route, navigation, products, setProducts, setDeliveries }) {
    console.log('DeliveryForm.tsx');
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    function amountIsValid(amount: string) {
        if (!(parseInt(amount) > 0)) {
            showMessage({
                message: "Antal ej giltig",
                description: "Antal måste vara större än 0",
                type: "warning"
            })
        }
    };

    function formIsValid() {
        if (Object.prototype.hasOwnProperty.call(delivery, 'product_id')
            && Object.prototype.hasOwnProperty.call(delivery, 'amount')
            && Object.prototype.hasOwnProperty.call(delivery, 'delivery_date'))  {

            return true;
        }
            return false;
    };



    async function makeDelivery() {
        if (formIsValid()) {
            const result = await deliveryModel.addDelivery(delivery);
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type
            })
            await deliveryModel.updateProduct(delivery, currentProduct);
            setDeliveries(await deliveryModel.getDeliveries());
            setProducts(await productModel.getProducts());
            navigation.navigate("List");
        } else {
            console.log(delivery);
            showMessage({
                message: "Fält saknas",
                description: "Produkt, antal och datum måsta vara valda",
                type: "warning"
            })

        };
    }

    const makeDeliveryButton = <Button title="skapa leverans" onPress={makeDelivery} />;

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}>Ny leverans </Text>
            <Text style={Typography.label}>Produkt:</Text>
                <View style={Forms.pickerInput}>
                <ProductDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                    products={products}
                    setCurrentProduct={setCurrentProduct}
                    />
                </View>
            <Text style={Typography.label}>Antal:</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content:string) => {
                        amountIsValid(content);
                        setDelivery({ ...delivery, amount: parseInt(content)})
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType='numeric'
                    placeholder='Antal'
                />
            <Text style={Typography.label}>Datum:</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            <Text style={Typography.label}>Kommmentar:</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content:string) => {
                        setDelivery({ ...delivery, comment: content})
                    }}
                    value={delivery?.comment}
                    placeholder='Kommentar'
                />
            {/* { goToList } */}
            { makeDeliveryButton }
        </ScrollView>
    );
};
