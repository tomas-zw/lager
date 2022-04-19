import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Invoices from './Invoices';
import CreateInvoice from './CreateInvoice';
import OneInvoice from './OneInvoice';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="Fakturor">
            <Stack.Screen name="Fakturor">
                {(screenProps) => <Invoices {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Skapa">
                {(screenProps) => <CreateInvoice {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="En Faktura" component={OneInvoice} />
        </Stack.Navigator>
    );
};
