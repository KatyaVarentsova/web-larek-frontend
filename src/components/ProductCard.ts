import { categoryMap } from "../types";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class ProductCard extends Component {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;

    constructor(events: IEvents, elementsBlock: HTMLElement, id: string, title: string, description: string, category: string, image: string, price: number) {
        super(events, elementsBlock)
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.image = image;
        this.price = price;

        this.render()
    }

    private render(): void {
        const cardCategory = ensureElement<HTMLSpanElement>('.card__category', this.element)
        const cardTitle = ensureElement<HTMLHeadingElement>('.card__title', this.element)
        const cardImage = ensureElement<HTMLImageElement>('.card__image', this.element)
        const cardPrice = ensureElement<HTMLSpanElement>('.card__price', this.element)

        cardCategory.textContent = this.category
        const categoryClass = categoryMap[this.category.toLocaleLowerCase()]
        if (categoryClass) {
            cardCategory.classList.add(`card__category_${categoryClass}`)
        }

        cardTitle.textContent = this.title
        cardImage.src = CDN_URL + this.image
        
        cardPrice.textContent = this.price ? `${this.price} синапсов` : `Бесценно`
    }

    protected addEventListeners() {
        this.element.addEventListener('click', () => {
            this.events.emit('card:click', this)
        })
    }
}