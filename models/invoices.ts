import config from "../config/config.json";
import storage from "./storage";
import orderModel from './orders';

import Invoice from '../interfaces/invoice';

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const token = await storage.readToken();
        const response = await fetch
            (`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                  'x-access-token': token.token
                },
            });
        const result = await response.json();

        return result.data;
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const token = await storage.readToken();
        const newInvoice = {
            order_id: invoice.order_id,
            total_price: invoice.total_price,
            api_key: config.api_key
        };

        const response = await fetch
            (`${config.base_url}/invoices`, {
                body: JSON.stringify(newInvoice),
                headers: {
                  'content-type': 'application/json',
                  'x-access-token': token.token
                },
                method: 'POST'
        })
        const result = await response.json();

        const order = {
            id: invoice.order_id,
            name: invoice.name,
            status_id: 600,
            api_key: config.api_key
        };
        const responseOrder = await fetch
            (`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'PUT'
        })
        console.log(response.status);
    },
};

export default invoices;
