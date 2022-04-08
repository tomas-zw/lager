import { StatusBar } from 'expo-status-bar';
import { Base } from './styles';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home.tsx';
import Pick from './components/Pick.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// const Tab = createBottomTabNavigator();
//
// const routeIcons : any = {
//     'Lager': 'home',
//     'Plock': 'list'
// };

export default function App() {
    const [products, setProducts] = useState([]);
    const Tab = createBottomTabNavigator();
    const routeIcons : any = {
        'Lager': 'home',
        'Plock': 'list'
    };

    return (
    <SafeAreaView style={Base.container}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = routeIcons[route.name] || 'alert';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: 'false'
                })}>
                {/* <Tab.Screen name="Lager" component={Home} /> */}
                <Tab.Screen name="Lager">
                    {() => <Home products={products} setProducts={setProducts} />}
                </Tab.Screen>
              {/* <Tab.Screen name="Plock" component={Pick} /> */}
              <Tab.Screen name="Plock">
                    {() => <Pick products={products} setProducts={setProducts} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
    );
}
