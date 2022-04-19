import config from "../config/config.json";
import storage from "./storage";

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
};

export default invoices;
