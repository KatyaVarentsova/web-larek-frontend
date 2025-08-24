import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export abstract class Modal extends Component {
    protected name: string;

    protected addEventListeners() {
        const buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this.element)
        buttonClose.addEventListener('click', () => {
            this.events.emit(`${this.name}:close`)
        })
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element && event.target !== ensureElement('.modal__container', this.element)) {
                this.events.emit(`${this.name}:close`)
            }
        })
    }

    open() {
        document.body.style.overflow = 'hidden';
        this.element.classList.add('modal_active')
    }

    close() {
        document.body.style.overflow = '';
        this.element.classList.remove('modal_active')
    }
}