import { StatusBar } from 'expo-status-bar';
import { Base } from './styles';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './components/Home.tsx';
import Pick from './components/Pick.tsx';
import Delivery from './components/DeliveryStack.tsx';
import Auth from './components/auth/Auth';
import Invoices from './components/invoices/InvoiceStack';

import authModel from './models/auth'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const routeIcons : any = {
    'Lager': 'home',
    'Plock': 'list',
    'Leverans': 'car',
    'Logga in': 'log-in',
    'Faktura': 'md-newspaper'
};

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
      setIsLoggedIn(await authModel.loggedIn() /* Vi kommer tillbaka till denna funktion. */);
    }, []);

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
                <Tab.Screen name="Lager">
                    {() => <Home products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Plock">
                    {() => <Pick products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Leverans">
                    {() => <Delivery products={products} setProducts={setProducts} />}
                </Tab.Screen>
                {isLoggedIn ?
                  <Tab.Screen name="Faktura">
                    {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
                  </Tab.Screen> :
                  <Tab.Screen name="Logga in">
                    {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                  </Tab.Screen>
                }
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
    );
}


                  // <Tab.Screen name="Faktura" component={Invoices} /> :
