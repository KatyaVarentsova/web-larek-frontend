import { IDelivery } from "../types";
import { ensureAllElements, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class DeliveryModal {
    delivery: IDelivery;
    element: HTMLElement;
    events: IEvents;
    buttonDelivery!: HTMLButtonElement;

    constructor(clonnedElement: HTMLElement, events: IEvents) {
        this.delivery = {
            payment: '',
            address: '',
        }
        this.element = this.createElement(clonnedElement)
        this.events = events;
        this.addEventListeners()
    }

    createElement(clonnedElement: HTMLElement) {
        return clonnedElement
    }

    addEventListeners() {
        const buttonClose = ensureElement<HTMLButtonElement>('.modal__close', this.element)
        buttonClose.addEventListener('click', () => {
            this.events.emit('delivery:close')
        })
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element && event.target !== ensureElement('.modal__container', this.element)) {
                this.events.emit('delivery:close')
            }
        })

        const formElement = ensureElement<HTMLFormElement>('.form', this.element)
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            this.events.emit('delivery:save', this.delivery);
            this.events.emit('contact:open')
        });

        this.selectionButtons()
        this.inputAddresses()
    }

    updateButtonState() {
        this.buttonDelivery.disabled = !(this.delivery.address && this.delivery.payment);
    }

    selectionButtons() {
        const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element);
        const buttonOnline = ensureElement<HTMLButtonElement>('.button_online', this.element)
        const buttonCash = ensureElement<HTMLButtonElement>('.button_cash', this.element)

        buttonOnline.addEventListener('click', () => {
            errorElement.style.display = 'none'
            buttonOnline.classList.add('button_alt-active')
            buttonCash.classList.remove('button_alt-active')
            this.delivery.payment = 'online'
            this.updateButtonState()
        })

        buttonCash.addEventListener('click', () => {
            errorElement.style.display = 'none'
            buttonCash.classList.add('button_alt-active')
            buttonOnline.classList.remove('button_alt-active')
            this.delivery.payment = 'cash'
            this.updateButtonState()
        })
    }

    isValidRussianString(str: string, input: HTMLInputElement) {
        const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element);

        if (/^[а-яА-ЯёЁ0-9\s.,-]+$/.test(str)) {
            errorElement.style.display = 'none'
            input.classList.remove('form__input__invalid')
            return true
        } else {
            errorElement.style.display = 'block'
            errorElement.textContent = 'Необходимо ввести адрес кириллицей'
            input.classList.add('form__input__invalid')
            return false
        }
    }

    inputAddresses() {
        const input = ensureElement<HTMLInputElement>('.form__input', this.element)
        const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element);

        input.addEventListener('input', () => {
            this.delivery.address = this.isValidRussianString(input.value, input) && input.value
            this.updateButtonState()
        })

        input.addEventListener('blur', () => {
            if (this.delivery.address && !(this.delivery.payment)) {
                errorElement.style.display = 'block'
                errorElement.textContent = 'Необходимо выбрать способ оплаты'
            }
        })
    }

    open() {
        this.buttonDelivery = ensureElement<HTMLButtonElement>('.button_further', this.element)
        this.buttonDelivery.disabled = true;

        this.updateButtonState()

        this.element.classList.add('modal_active') 
    }

    close() {
        this.element.classList.remove('modal_active')
    }
}