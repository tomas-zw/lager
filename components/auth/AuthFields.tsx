import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
            />
            <View style={Base.buttonSpace}>
                <Button
                    title={title}
                    onPress={() => {
                        submit();
                        navigation.navigate("Lager");
                    }}
                    testID="delivery-button"
                />
            </View>
            <View style={Base.buttonSpace}>
                {title === "Logga in" &&
                    <Button
                        title="Registrera istället"
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    />
                }
            </View>
        </View>
    );
};
