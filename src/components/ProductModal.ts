import { categoryMap, IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class ProductModal {
    element: HTMLElement;
    events: IEvents;

    constructor(clonnedCardTemplate: HTMLElement, events: IEvents) {
        this.element = this.createElement(clonnedCardTemplate)
        this.events = events;

        this.addEventListeners()
    }

    createElement(clonnedCardTemplate: HTMLElement) {
        return clonnedCardTemplate
    }

    addEventListeners() {
        const buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this.element)
        buttonClose.addEventListener('click', () => {
            this.events.emit('card:close')
        })
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element && event.target !== ensureElement('.modal__container', this.element)) {
                this.events.emit('card:close')
            }
        })
    }

    open(product: IProduct) {
        const productImage = ensureElement<HTMLImageElement>('.card__image', this.element)
        const productCategory = ensureElement<HTMLSpanElement>('.card__category', this.element)
        const productTitle = ensureElement<HTMLHeadingElement>('.card__title', this.element)
        const productText = ensureElement<HTMLParagraphElement>('.card__text', this.element)
        const productPrice = ensureElement<HTMLSpanElement>('.card__price', this.element)
        const productButton = ensureElement<HTMLButtonElement>('.button', this.element)
        
        productImage.src = CDN_URL + product.image
        productCategory.textContent = product.category
        const categoryClass = categoryMap[product.category.toLocaleLowerCase()]
        if (categoryClass) {
            productCategory.classList.add(`card__category_${categoryClass}`)
        }
        productTitle.textContent = product.title
        productText.textContent = product.description
        productPrice.textContent = product.price ? `${product.price} синапсов` : `Бесценно`
        this.addProductInBasket(productButton, product)

        this.element.classList.add('modal_active')
    }

    close() {
        this.element.classList.remove('modal_active')
    }

    addProductInBasket(productButton: HTMLButtonElement, product: IProduct) {
        productButton.addEventListener('click', () => {
            this.events.emit('product:put', product)
        })
    }


}