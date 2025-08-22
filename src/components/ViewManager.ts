import { categoryMap, IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { cloneTemplate, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { ProductCard } from "./ProductCard";

export class ViewManager {
    headerNode: HTMLElement;
    galleryNode: HTMLElement;
    events: IEvents;

    constructor(headerSelector: string, gallerySelector: string, events: IEvents) {
        this.headerNode = ensureElement(headerSelector)
        this.galleryNode = ensureElement(gallerySelector)
        this.events = events;

        this.addEventBasket()
    }

    renderProduct(elementNode: HTMLElement) {
        this.galleryNode.append(elementNode)
    }

    addEventBasket() {
        const basket = ensureElement('.header__basket', this.headerNode)

        basket.addEventListener('click', () => {
            this.events.emit('basket:add')
        })
    }

    displayBasketCounter(orderCounte: number) {
        const basketCounter = ensureElement('.header__basket-counter', this.headerNode)
        basketCounter.textContent = String(orderCounte)
    }
} 