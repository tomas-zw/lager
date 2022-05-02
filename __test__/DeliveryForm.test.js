import { render } from "@testing-library/react-native";
import DeliveryForm from "../components/DeliveryForm";

jest.mock("../components/DeliveryProductDropDown.tsx", () => "DeliveryProductDropDown");

test('header should exist containing text Ny leverans', async () => {
    const { getByText } = render(<DeliveryForm />);
    const header = await getByText('Ny leverans');

    expect(header).toBeDefined();
});
