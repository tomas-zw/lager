import config from '../config/config.json';
import productModel from '../models/products';
import Delivery from '../interfaces/delivery';
import Product from '../interfaces/products';

const deliveries = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
    const response = await fetch
        (`${config.base_url}/deliveries?api_key=${config.api_key}`);
    const result = await response.json();

    return result.data;

    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        const newDelivery = { ...delivery };
        newDelivery['api_key'] = config.api_key;
        const response = await fetch
            (`${config.base_url}/deliveries`, {
                body: JSON.stringify(newDelivery),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'POST'
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "leverans",
            message: `${result.data.amount} : ${result.data.product_name}`,
            type: "success",
        };

        // console.log(result.data);
        // return result.data;
    },
    updateProduct: async function updateProduct(delivery: Partial<Delivery>, product: Partial<Product>) {
        const currentProduct = {
            id: product.id,
            name: product.name,
            stock: product.stock + delivery.amount,
            api_key: config.api_key,
        };
        await productModel.updateProduct(currentProduct);
    },

};

export default deliveries;
