import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.base}>
            <Text style={styles.title}>Skruv AB</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Stock />
            <StatusBar style="auto" />
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
  },
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,
  },
    title: {
        alignSelf: 'center',
        color: '#333',
        fontSize: 42,
        padding: 10,
    },
});
