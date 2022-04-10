import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveryList from './DeliveryList.tsx';
import DeliveryForm from './DeliveryForm.tsx';

const Stack = createNativeStackNavigator();

export default function Delivery(props) {
    console.log('Delivery.tsx');

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveryList} />
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
