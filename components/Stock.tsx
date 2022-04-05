import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';
import productModel from "../models/products.ts";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const allProducts = await productModel.getProducts();
            setProducts(allProducts);
        })();
    }, []);

    const list = products.map((product, index) =>
        <Text style={Typography.normal} key={index}>
            { product.name } Antal: { product.stock}</Text>);

    return (
        <View>
          {list}
        </View>
      );
}

export default function Stock() {
    return (
        <View>
            <Text style={Typography.header3}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}
