import { render } from "@testing-library/react-native";
import DeliveryForm from "../components/DeliveryForm";

jest.mock("../components/DeliveryProductDropDown.tsx", () => "DeliveryProductDropDown");

test('header should exist containing text Ny leverans', async () => {
    const { getByText } = render(<DeliveryForm />);
    const header = await getByText('Ny leverans');

    expect(header).toBeDefined();
});

test('label should exist containing text Produkt:', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Produkt:');

    expect(label).toBeDefined();
});

test('label should exist containing text Antal:', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Antal:');

    expect(label).toBeDefined();
});

test('label should exist containing text Kommentar:', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Kommentar:');

    expect(label).toBeDefined();
});

test('label should exist containing text Datum:', async () => {
    const { getByText } = render(<DeliveryForm />);
    const label = await getByText('Datum:');

    expect(label).toBeDefined();
});
