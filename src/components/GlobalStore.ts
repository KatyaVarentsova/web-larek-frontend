/* Класс, описывающий состояние приложения*/

import { IContact, IDelivery, IOrder, IProduct } from "../types";

export class GlobalStore {
    private products: IProduct[];
    private basketProducts: IProduct[];
    private delivery: IDelivery;
    private contact: IContact;
    private order: IOrder;

    constructor() {
        this.products = [];
        this.basketProducts = [];
    }

    setProducts(products: IProduct[]) {
        this.products = products
    }

    getBasketProducts() {
        return this.basketProducts
    }

    addBasketProducts(product: IProduct) { 
        this.basketProducts.push(product)
    }

    deleteBasketProducts(product: IProduct) { 
        this.basketProducts = this.basketProducts.filter(item => {
            return item !== product
        })
    }

    cleaningBasketProducts() {
        this.basketProducts.length = 0;
    }

    isProductInBasket(product: IProduct) {
        return this.basketProducts.includes(product);
    }

    orderAmount() {
        let amount = 0
        this.basketProducts.forEach(item => {
            if (item.price) {
                amount += item.price
            }
        })
        return amount
    }

    orderCount() {
        return this.basketProducts.length
    }

    allProductsID() {
        const arrID: string[] = []
        this.basketProducts.forEach((item) => {
            arrID.push(item.id)
        })
        return arrID
    }

    setDelivery(delivery: IDelivery) {
        this.delivery = delivery;
    }

    getDelivery() {
        return this.delivery
    }

    setContact(contact: IContact) {
        this.contact = contact
    }

    getContact() {
        return this.contact
    }

    getOrder() {
        return this.order = {
            payment: this.delivery.payment,
            email: this.contact.email,
            phone: this.contact.phone,
            address: this.delivery.address,
            total: this.orderAmount(),
            items: this.allProductsID()
        }
    }
   
}