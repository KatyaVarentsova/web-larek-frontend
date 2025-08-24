import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Modal } from "./base/Modal";

export class ResultModal extends Modal {
    constructor(elementsBlock: HTMLElement, events: IEvents, name: string) {
        super(events, elementsBlock)
        this.name = name
    }

    protected addEventListeners() {
        super.addEventListeners()
        const buttonElement = ensureElement<HTMLButtonElement>('.button', this.element);
        buttonElement.addEventListener('click', () => {
            this.events.emit('result:close')
        })
    }

    render (orderAmount: number) {
        const descriptionElement = ensureElement<HTMLParagraphElement>('.film__description', this.element)

        descriptionElement.textContent = `Списано ${orderAmount} синапсов`
        this.open()
    }
}