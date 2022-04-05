import { StatusBar } from 'expo-status-bar';
import { Base } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home.tsx';
import Pick from './components/Pick.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const routeIcons : any = {
    'Lager': 'home',
    'Plock': 'list'
};

export default function App() {
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
                })}>
              <Tab.Screen name="Lager" component={Home} />
              <Tab.Screen name="Plock" component={Pick} />
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
    );
}
