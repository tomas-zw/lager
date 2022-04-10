import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import OrderItem from '../interfaces/order_item.ts'
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    // console.log('PickList.tsx');

    const { order } = route.params;
    let allInStock = true;

    async function pick() {
        await orderModel.pickOrder(order);
        await orderModel.pickUpdateStock(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
        // navigation.navigate("List");
    }

    const orderItemsList = order.order_items.map((item: OrderItem, index: number) => {
        return <Text
                key={index} style={Typography.normal}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    let pickOrOutOfStock = order.order_items.map((item: OrderItem, index: number) => {
        if (item.amount > item.stock) {
            allInStock = false;
            return <Text key={index} style={Typography.header4}>{item.name} out of stock</Text>;
        };
    });

    if (allInStock) {
        pickOrOutOfStock = <Button title="Plocka order" onPress={pick} />;
    };

    return (
        <View style={Base.orderButton}>
            <Text style={Typography.header4}>Kund</Text>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header4}>Produkter:</Text>
            {orderItemsList}

            {pickOrOutOfStock}
        </View>
    )
};
