import { IEvents } from "./base/events";

export class DeliveryModal {
    element: HTMLElement;
    events: IEvents;

    constructor(clonnedElement: HTMLElement, events: IEvents) {
        this.element = this.createElement(clonnedElement)
        this.events = events;
    }

    createElement(clonnedElement: HTMLElement) {
        return clonnedElement
    }

    open() {
        this.element.classList.add('modal_active')
    }
}