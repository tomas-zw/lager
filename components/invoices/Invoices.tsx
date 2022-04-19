import { Text, ScrollView, Button, View } from 'react-native';

import { Base, Typography } from '../../styles'

export default function Invoices({ navigation, setIsLoggedIn }) {
    // console.log('Home.tsx');

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Alla Fakturor</Text>
            <Text style={Typography.normal}>visa fakturor här</Text>
            <View style={Base.buttonSpace}>
                <Button
                    title='Skapa faktura'
                    onPress={() => {
                        navigation.navigate('Skapa');
                    }}
                />
            </View>
            <View style={Base.buttonSpace}>
                <Button
                    title='Logga ut'
                    onPress={() => {
                        setIsLoggedIn(false);
                    }}
                />
            </View>
        </ScrollView>
    );
}
