import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class ResultModal {
    element: HTMLElement;
    events: IEvents;

    constructor(clonnedElement: HTMLElement, events: IEvents) {
        this.element = this.createElement(clonnedElement)
        this.events = events;
    }

    createElement(clonnedElement: HTMLElement) {
        return clonnedElement
    }

    addEventListeners() {
        const buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this.element);
        buttonClose.addEventListener('click', () => {
            this.events.emit('result:close');
        });
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element && event.target !== ensureElement('.modal__container', this.element)) {
                this.events.emit('result:close');
            }
        });
        const buttonElement = ensureElement<HTMLButtonElement>('.button', this.element);
        buttonElement.addEventListener('click', () => {
            this.events.emit('result:close')
        })
    }

    open(orderAmount: number) {
        const descriptionElement = ensureElement<HTMLParagraphElement>('.film__description', this.element)

        descriptionElement.textContent = `Списано ${orderAmount} синапсов`

        this.element.classList.add('modal_active')
        this.addEventListeners()
    }

    close() {
        this.element.classList.remove('modal_active')
    }
}