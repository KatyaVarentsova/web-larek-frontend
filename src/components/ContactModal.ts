import { IContact } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Modal } from "./base/Modal";

export class ContactModal extends Modal {
    private contact: IContact;
    private buttonContact!: HTMLButtonElement;

    constructor(elementsBlock: HTMLElement, events: IEvents, name: string) {
        super(events, elementsBlock)
        this.name = name
        this.contact = {
            email: '',
            phone: '',
        }
    }

    protected addEventListeners() {
        super.addEventListeners()

        const formElement = ensureElement<HTMLFormElement>('.form', this.element)
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            this.events.emit('contact:save', this.contact)
        })

        this.inputEmail()
        this.inputPhone()
    }

    private updateButtonState() {
        this.buttonContact.disabled = !(this.contact.email && this.contact.phone);
    }

    private isValidateEmail(email: string, input: HTMLInputElement) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element)

        if (regex.test(String(email).toLowerCase())) {
            errorElement.style.display = 'none'
            input.classList.remove('form__input__invalid')
            return true
        } else {
            errorElement.style.display = 'block'
            errorElement.textContent = 'Неправильный адрес электронной почты'
            input.classList.add('form__input__invalid')
            return false
        }
    }

    private inputEmail() {
        const input = ensureElement<HTMLInputElement>('.input__email', this.element)

        input.addEventListener('blur', () => {
            this.contact.email = this.isValidateEmail(input.value, input) ? input.value : '';
            this.updateButtonState()
        })

        input.addEventListener('input', () => {
            const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element);
            errorElement.style.display = 'none';
            input.classList.remove('form__input__invalid');
        })
    }

    private inputPhone() {
        const input = ensureElement<HTMLInputElement>('.input__phone', this.element)
        const errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.element);

        input.addEventListener('input', () => {
            errorElement.style.display = 'none';
            input.classList.remove('form__input__invalid');

            let value = input.value.replace(/\D/g, '');

            if (value.startsWith('8')) {
                value = '7' + value.slice(1);
            } else if (!value.startsWith('7')) {
                value = '7' + value;
            }

            value = value.substring(0, 11);

            let formatted = '+7 (';
            if (value.length > 1) formatted += value.substring(1, 4);
            if (value.length >= 4) formatted += ') ' + value.substring(4, 7);
            if (value.length >= 7) formatted += '-' + value.substring(7, 9);
            if (value.length >= 9) formatted += '-' + value.substring(9, 11);

            input.value = formatted;

            this.contact.phone = input.value;
            this.updateButtonState()
        })

        input.addEventListener('blur', () => {
            if (input.value.length !== 18) {
                errorElement.style.display = 'block'
                errorElement.textContent = 'Неправильный номер телефона'
                input.classList.add('form__input__invalid')
            }
        })
    }

    render() {
        this.buttonContact = ensureElement<HTMLButtonElement>('.button', this.element)
        this.buttonContact.disabled = true;

        this.updateButtonState()

        this.open()
    }
}