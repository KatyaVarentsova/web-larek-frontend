import { ensureElement } from "../../utils/utils";
import { IEvents } from "./events";
import { Modal } from "./Modal";

export abstract class Form extends Modal {
    protected formElement: HTMLFormElement;
    protected buttonForm!: HTMLButtonElement;

    constructor(elementsBlock: HTMLElement, events: IEvents) {
        super(events, elementsBlock)
    }

    protected eventsEmit() {}

    protected addEventListeners() {
        super.addEventListeners()

        this.formElement = ensureElement<HTMLFormElement>('.form', this.element)
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            this.eventsEmit()
        });
    }

    render() {
        this.buttonForm = ensureElement<HTMLButtonElement>('.button_further', this.element)
        this.buttonForm.disabled = true;

        this.open()
    }
}