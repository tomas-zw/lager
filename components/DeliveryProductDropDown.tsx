import { Picker } from "@react-native-picker/picker";

export default function DeliveryProductDropDown(props) {
    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(async () => {
    //     // setProducts(await productModel.getProducts());
    //     props.setProducts(await productModel.getProducts());
    // }, []);
    let productsHash: any = {};


    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery(
                    { ...props.delivery, product_id: itemValue ,
                        product_name: productsHash[itemValue].name});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}
