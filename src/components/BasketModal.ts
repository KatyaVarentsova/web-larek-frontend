import { IProduct } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Modal } from "./base/Modal";

export class BasketModal extends Modal {
    constructor(elementsBlock: HTMLElement, events: IEvents, name: string) {
        super(events, elementsBlock)
        this.name = name
    }

    protected addEventListeners() {
        super.addEventListeners()

        const basketButton = ensureElement<HTMLButtonElement>('.button', this.element)
        basketButton.addEventListener('click', () => {
            this.events.emit('delivery:open')
        })
    }

    private addRemoveListeners(btn: HTMLButtonElement, product: IProduct) {
        btn.addEventListener('click', () => {
            this.events.emit('basket:delete', product)
        })
    }

    render(products: IProduct[], orderAmount: number) {
        const basketElement = ensureElement<HTMLDivElement>('.basket', this.element)
        const listElement = ensureElement<HTMLUListElement>('.basket__list', basketElement)
        const actionsElement = ensureElement<HTMLDivElement>('.modal__actions', basketElement)
        
        const priceElement = ensureElement<HTMLSpanElement>('.basket__price')

        listElement.innerHTML = ''

        if (products.length !== 0) {
            products.forEach((product, index) => { 
                const deleteButton = createElement<HTMLButtonElement>('button',
                    { className: 'basket__item-delete', ariaLabel: 'удалить' })

                const basketItem = createElement<HTMLLIElement>('li',
                    { className: 'basket__item card card_compact' },
                    [
                        createElement<HTMLSpanElement>('span',
                            { className: 'basket__item-index', textContent: String(index + 1) }),
                        createElement<HTMLSpanElement>('span',
                            { className: 'card__title', textContent: product.title }),
                        createElement<HTMLSpanElement>('span',
                            { className: 'card__price', textContent: `${product.price} синапсов` }),
                        deleteButton
                    ]
                )
                this.addRemoveListeners(deleteButton, product)
                listElement.append(basketItem)
            })
            
            actionsElement.style.display = 'flex'
            priceElement.textContent = `${orderAmount} синапсов`

        } else {
            actionsElement.style.display = 'none'
            const emptyElement = createElement<HTMLDivElement>('div', { className: 'card__title basket__empty', textContent: 'Корзина пока пуста' })
            listElement.append(emptyElement)
        }

        this.open()
    }
}