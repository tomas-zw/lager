import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setProducts(result.data));
      }, []);

    const list = products.map((product, index) =>
        <Text style={styles.products} key={index}>{ product.name } Antal: { product.stock}</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
    return (
        <View>
            <Text style={styles.inventory}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}

const styles = StyleSheet.create({
    inventory: {
        alignSelf: 'center',
        color: '#333',
        fontSize: 24,
        padding: 10,
    },
    products: {
        color: '#333',
        fontSize: 15,
        paddingBottom: 10,
    },
});
