import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './ShipList';
import Map from './ShipMap';

const Stack = createNativeStackNavigator();

export default function ShipLocation() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Location" component={Map} />
        </Stack.Navigator>
    );
};
