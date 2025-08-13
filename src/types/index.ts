export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
}

export interface IOrder {
    productsID: string[],

}

/*interface IBasket {
    products: IProduct[],

}*/

export interface IGetProductsResponse {
    total: number;
    items: IProduct[];
}

//_soft, _hard, _other, _additional, _button
export const categoryMap: Record<string, string> = {
    'софт-скил': 'soft',
    'хард-скил': 'hard',
    'кнопка': 'button',
    'дополнительное': 'additional',
    'другое': 'other',
}