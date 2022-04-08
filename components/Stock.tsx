import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../styles';
import productModel from "../models/products.ts";

function StockList({products, setProducts}) {
    // const [products, setProducts] = useState([]);

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

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={Typography.header3}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
            {/* <StockList /> */}
        </View>
    );
}
