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

    setBasketProducts(product: IProduct) {
        this.basketProducts.push(product)
    }
}