import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import DeliveryList from './DeliveryList.tsx';
import DeliveryForm from './DeliveryForm.tsx';

const Stack = createNativeStackNavigator();

export default function Delivery(props) {
    console.log('Delivery.tsx');

    const [deliveries, setDeliveries] = useState([]);

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <DeliveryList
                    {...screenProps}
                    deliveries={deliveries}
                    setDeliveries={setDeliveries} />}
            </Stack.Screen>

            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm
                    {...screenProps}
                    products={props.products}
                    setProducts={props.setProducts}
                    setDeliveries={setDeliveries} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
