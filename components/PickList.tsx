import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    let allInStock = true;

    async function pick() {
        await orderModel.pickOrder(order);
        await orderModel.pickUpdateStock(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index: number) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    let pickOrOutOfStock = order.order_items.map((item, index: number) => {
        if (item.amount > item.stock) {
            allInStock = false;
            return <Text key={index}>{item.name} out of stock</Text>;
        };
    });

    // if (outOfStock[0] == null) {
    if (allInStock) {
        pickOrOutOfStock = <Button title="Plocka order" onPress={pick} />;
    };

    return (
        <View style={Base.orderButton}>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>
            {orderItemsList}

            {pickOrOutOfStock}
        </View>
    )
};
