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

export interface IPostOrderResponse {
    id: string,
    total: number
}

export interface IOrderRequestBody {
    payment: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}

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

export interface IGlobalStore {
    setProducts(products: IProduct[]): void;
    getBasketProducts(): IProduct[];
    addBasketProducts(product: IProduct): void;
    deleteBasketProducts(product: IProduct): void;
    cleaningBasketProducts(): void;
    isProductInBasket(product: IProduct): boolean;
    orderAmount(): number;
    orderCount(): number;
    allProductsID(): string[];
    setDelivery(delivery: IDelivery): void;
    getDelivery(): IDelivery;
    setContact(contact: IContact): void;
    getContact(): IContact;
    getOrder(): IOrderRequestBody;
}

export interface IViewManager {
    renderProduct(elementNode: HTMLElement):void,
    addEventBasket():void,
    displayBasketCounter(orderCounte: number):void
}
