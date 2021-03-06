import config from "../config/config.json";

import Product from '../interfaces/products';

const products = {
    getProducts: async function getProducts(): Promise<Product[]> {
        const response = await fetch
            (`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    updateProduct: async function updateProduct(product: Partial<Product>) {
        const response = await fetch
            (`${config.base_url}/products`, {
                body: JSON.stringify(product),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'PUT'
        });
        console.log(response.status);
    },
    getOneProduct: async function getOneProduct(productId: number) {
        const response = await fetch
            (`${config.base_url}/${productId}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },


};

export default products;
