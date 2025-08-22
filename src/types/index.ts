export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
}

export interface IGetProductsResponse {
    total: number,
    items: IProduct[],
}

export interface IPostProductsResponse {
    id: string,
    total: number
}

//_soft, _hard, _other, _additional, _button
export const categoryMap: Record<string, string> = {
    'софт-скил': 'soft',
    'хард-скил': 'hard',
    'кнопка': 'button',
    'дополнительное': 'additional',
    'другое': 'other',
}

export interface IDelivery {
    payment: string,
    address: string,
}

export interface IContact {
    email: string,
    phone: string,
}

export interface IOrder extends IDelivery, IContact {
    total: number,
    items: string[]
}

