/* Класс, описывающий состояние приложения*/

import { IProduct } from "../types";

export class GlobalStore {
    private products: IProduct[];
    private basketProducts: IProduct[];
    //заказ
    //состояние модалок

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

    setAddBasketProducts(product: IProduct) {
        this.basketProducts.push(product)
    }

    setDeleteBasketProducts(product: IProduct) {
        this.basketProducts = this.basketProducts.filter(item => {
            return item !== product
        })
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

    orderCounte() {
        return this.basketProducts.length
    }
   
}