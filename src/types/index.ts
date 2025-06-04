export interface IBasket {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
    totalPrice(prices: number[]): number;
}

export interface ICardsList {
    drawCards(cards: ICardItem[]): void;
}

export type TCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface ICardItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: TCategory;
    price: number | null
}

export interface IUser {
    paymentOnline: boolean;
    email: string;
    phone: string;
    address: string;
}

export type TOrder = Pick<IUser, 'paymentOnline' | 'address'>

export type TUserContacts = Pick<IUser, 'email' | 'phone'>

export type TSuccessfulPayment = Pick<IBasket, 'totalPrice'>