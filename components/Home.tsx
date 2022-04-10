import { Image, Text, ScrollView } from 'react-native';
import { Base, Typography } from '../styles'
import warehouse from '../assets/warehouse.jpg';
import Stock from '../components/Stock';

export default function Home({products, setProducts}) {
    // console.log('Home.tsx');

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Skruv AB</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}

