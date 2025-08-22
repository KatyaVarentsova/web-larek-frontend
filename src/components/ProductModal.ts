import { categoryMap, IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class ProductModal {
    element: HTMLElement;
    events: IEvents;
    private _productButtonHandler?: (event: MouseEvent) => void;

    constructor(clonnedCardTemplate: HTMLElement, events: IEvents) { //поменять clonnedCardTemplate (какой элемент)
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

    open(product: IProduct, isProductInBasket: boolean) {
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
        if (product.price) {
            productPrice.textContent = `${product.price} синапсов`
            productButton.disabled = false
            if (isProductInBasket) {
                productButton.textContent = 'Убрать'
                this.setDeleteHandler(productButton, product)
            } else {
                productButton.textContent = 'В корзину'
                this.setAddHandler(productButton, product)
            }

        } else {
            productPrice.textContent = `Бесценно`
            productButton.textContent = 'Не продаётся'
            productButton.disabled = true
        }

        document.body.style.overflow = 'hidden';
        this.element.classList.add('modal_active')
    }

    close() {
        document.body.style.overflow = '';
        this.element.classList.remove('modal_active')
    }

    private removeHandler(btn: HTMLButtonElement) {
        if (this._productButtonHandler) {
            btn.removeEventListener('click', this._productButtonHandler);
        }
    }

    private setAddHandler(btn: HTMLButtonElement, product: IProduct) {
        this.removeHandler(btn)
        this._productButtonHandler = () => {
            this.events.emit('product:put', product)
            this.setDeleteHandler(btn, product);
            btn.textContent = 'Убрать';
            this.close()
        }
        btn.addEventListener('click', this._productButtonHandler)
    }

    private setDeleteHandler(btn: HTMLButtonElement, product: IProduct) {
        this.removeHandler(btn)
        this._productButtonHandler = () => {
            this.events.emit('product:delete', product)
            this.setAddHandler(btn, product);
            btn.textContent = 'В корзину';
            this.close()

        }
        btn.addEventListener('click', this._productButtonHandler)
    }
}