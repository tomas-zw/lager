import config from '../config/config.json';

import Order from '../interfaces/order';
import OrderItem from '../interfaces/order_item';

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

        const response = await fetch
            (`${config.base_url}/orders`, {
                body: JSON.stringify(updateOrder),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'PUT'
        })
        console.log(response.status);
    },
    pickUpdateStock: async function pickUpdateStock(order: Order) {
        for (const item of order.order_items) {
            const updateStock = {
            id: item.product_id,
            name: item.name,
            stock: item.stock - item.amount,
            api_key: config.api_key
            };
            const response = await fetch
                (`${config.base_url}/products`, {
                    body: JSON.stringify(updateStock),
                    headers: {
                      'content-type': 'application/json'
                    },
                    method: 'PUT'
            })
            console.log(response.status);

        };



        // (async () => {
        //     const response = order.order_items.map((item: OrderItem) => {
        //         const updateStock = {
        //         id: item.product_id,
        //         name: item.name,
        //         stock: item.stock - item.amount,
        //         api_key: config.api_key
        //         };
        //
        //         return await fetch
        //         (`${config.base_url}/orders`, {
        //             body: JSON.stringify(updateStock),
        //             headers: {
        //               'content-type': 'application/json'
        //             },
        //             method: 'PUT'
        //         })
        //     });
        // })();
    },
};
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        // TODO: Ändra status för ordern till packad

export default orders;
