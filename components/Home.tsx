import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from '../components/Stock.tsx';

export default function Home() {
    return (
        <ScrollView style={styles.base}>
            <Text style={styles.title}>Skruv AB</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Stock />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
