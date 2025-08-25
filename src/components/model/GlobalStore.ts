/* Класс, описывающий состояние приложения*/
import { IContact, IDelivery, IGlobalStore, IOrder, IOrderRequestBody, IProduct } from "../../types";

export class GlobalStore implements IGlobalStore {
    private products: IProduct[];
    private basketProducts: IProduct[];
    private delivery: IDelivery;
    private contact: IContact;
    private order: IOrder;

    constructor() {
        this.products = [];
        this.basketProducts = [];
    }

    setProducts(products: IProduct[]):void {
        this.products = products
    }

    getBasketProducts():IProduct[] {
        return this.basketProducts
    }

    addBasketProducts(product: IProduct):void { 
        this.basketProducts.push(product)
    }

    deleteBasketProducts(product: IProduct):void { 
        this.basketProducts = this.basketProducts.filter(item => {
            return item !== product
        })
    }

    cleaningBasketProducts():void {
        this.basketProducts.length = 0;
    }

    isProductInBasket(product: IProduct):boolean {
        return this.basketProducts.includes(product);
    }

    orderAmount():number {
        let amount = 0
        this.basketProducts.forEach(item => {
            if (item.price) {
                amount += item.price
            }
        })
        return amount
    }

    orderCount():number {
        return this.basketProducts.length
    }

    allProductsID(): string[] {
        const arrID: string[] = []
        this.basketProducts.forEach((item) => {
            arrID.push(item.id)
        })
        return arrID
    }

    setDelivery(delivery: IDelivery):void {
        this.delivery = delivery;
    }

    getDelivery():IDelivery {
        return this.delivery
    }

    setContact(contact: IContact):void {
        this.contact = contact
    }

    getContact():IContact {
        return this.contact
    }

    getOrder(): IOrderRequestBody { 
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