import { IViewManager } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


export class ViewManager implements IViewManager {
    private headerNode: HTMLElement;
    private galleryNode: HTMLElement;
    private events: IEvents;

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
            this.events.emit('basket:open')
        })
    }

    displayBasketCounter(orderCounte: number) {
        const basketCounter = ensureElement('.header__basket-counter', this.headerNode)
        basketCounter.textContent = String(orderCounte)
    }
} 