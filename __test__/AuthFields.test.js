import { render, fireEvent } from "@testing-library/react-native";
import AuthFields from "../components/auth/AuthFields";

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth
};
const mockSubmit = jest.fn();
const navigation = {
    navigate: () => false
};


test('button onclick should fire a function', async () => {
    const { getByTestId } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title="Logga in"
        navigation={navigation}
        />);
    const submitButton = getByTestId("delivery-button");

    expect(submitButton).toBeDefined();
    fireEvent.press(submitButton);
});
