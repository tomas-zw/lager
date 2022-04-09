import config from '../config/config.json';

import productModel from "../models/products.ts";
import Order from '../interfaces/order';

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch
            (`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Order) {
        const updateOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key
        };

        await updateOrderPut(updateOrder);
    },
    pickUpdateStock: async function pickUpdateStock(order: Order) {
        for (const item of order.order_items) {
            const updateStock = {
            id: item.product_id,
            name: item.name,
            stock: item.stock - item.amount,
            api_key: config.api_key
            };

            await productModel.updateProduct(updateStock);
        };
    },
};

async function updateOrderPut(order: Partial<Order>) {
    const response = await fetch
        (`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
    })
    console.log(response.status);
};

export default orders;
