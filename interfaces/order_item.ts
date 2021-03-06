export default interface OrderItem {
    product_id: number,
    amount: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: any,
    stock: number,
    location: string,
    price: number,
}
