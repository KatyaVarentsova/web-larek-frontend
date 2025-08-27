import { IDelivery } from "../types";
import { ensureAllElements, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./base/Form";

export class DeliveryForm extends Form {
    private delivery: IDelivery;

    constructor(elementsBlock: HTMLElement, events: IEvents, name: string) {
        super(elementsBlock, events)
        this.name = name
        this.delivery = {
            payment: '',
            address: '',
        }
    }

    protected eventsEmit() {
        this.events.emit('delivery:save', this.delivery);
        this.events.emit('contact:open')
    }

    protected addEventListeners() {
        super.addEventListeners()

        this.selectionButtons()
        this.inputAddresses()
    }

    private updateButtonState() {
        this.buttonForm.disabled = !(this.delivery.address && this.delivery.payment);
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
        super.render()
        this.updateButtonState()
    }
}