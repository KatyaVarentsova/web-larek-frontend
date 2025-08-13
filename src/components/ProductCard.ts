import { categoryMap } from "../types";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class ProductCard {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    element: HTMLElement;

    constructor(id: string, title: string, description: string, category: string, image: string, price: number, clonnedCardTemplate: HTMLElement, events: IEvents) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price;

        this.element = this.createElement(clonnedCardTemplate)
        this.addEventListeners(events)
    }

    createElement(clonnedCardTemplate: HTMLElement) {
        const cardCategory = ensureElement<HTMLSpanElement>('.card__category', clonnedCardTemplate)
        const cardTitle = ensureElement<HTMLHeadingElement>('.card__title', clonnedCardTemplate)
        const cardImage = ensureElement<HTMLImageElement>('.card__image', clonnedCardTemplate)
        const cardPrice = ensureElement<HTMLSpanElement>('.card__price', clonnedCardTemplate)

        cardCategory.textContent = this.category
        const categoryClass = categoryMap[this.category.toLocaleLowerCase()]
        if (categoryClass) {
            cardCategory.classList.add(`card__category_${categoryClass}`)
        }

        cardTitle.textContent = this.title
        cardImage.src = CDN_URL + this.image
        
        cardPrice.textContent = this.price ? `${this.price} синапсов` : `Бесценно`

        return clonnedCardTemplate
    }

    addEventListeners(events: IEvents) {
        this.element.addEventListener('click', () => {
            events.emit('card:click', this)
        })
    }
}