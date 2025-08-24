import { IDelivery } from "../types";
import { ensureAllElements, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Modal } from "./base/Modal";

export class DeliveryModal extends Modal {
    private delivery: IDelivery;
    private buttonDelivery!: HTMLButtonElement;

    constructor(elementsBlock: HTMLElement, events: IEvents, name: string) {
        super(events, elementsBlock)
        this.name = name
        this.delivery = {
            payment: '',
            address: '',
        }
    }

    protected addEventListeners() {
        super.addEventListeners()
        const formElement = ensureElement<HTMLFormElement>('.form', this.element)
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            this.events.emit('delivery:save', this.delivery);
            this.events.emit('contact:open')
        });

        this.selectionButtons()
        this.inputAddresses()
    }

    private updateButtonState() {
        this.buttonDelivery.disabled = !(this.delivery.address && this.delivery.payment);
    }

    private selectionButtons() {
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

    private isValidRussianString(str: string, input: HTMLInputElement) {
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

    private inputAddresses() {
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

    render() {
        this.buttonDelivery = ensureElement<HTMLButtonElement>('.button_further', this.element)
        this.buttonDelivery.disabled = true;

        this.updateButtonState()

        this.open()
    }
}