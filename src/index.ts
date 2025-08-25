import './scss/styles.scss';
import { API_URL } from './utils/constants'
import { Api } from './components/base/api'
import { GlobalStore } from './components/model/GlobalStore';
import { IContact, IDelivery, IGetProductsResponse, IPostOrderResponse, IProduct } from './types';
import { ViewManager } from './components/view/ViewManager';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BasketModal } from './components/BasketModal';
import { DeliveryModal } from './components/DeliveryModal';
import { ContactModal } from './components/ContactModal';
import { ResultModal } from './components/ResultModal';

const api = new Api(API_URL)
const globalStore = new GlobalStore()
const eventEmitter = new EventEmitter()
const viewManager = new ViewManager('.header', '.gallery', eventEmitter)
const productModal = new ProductModal(ensureElement('.modal__card'), eventEmitter, 'card')
const basketModal = new BasketModal(ensureElement('.modal__basket'), eventEmitter, 'basket')
const deliveryModal = new DeliveryModal(ensureElement('.modal__delivery'), eventEmitter, 'delivery')
const contactModal = new ContactModal(ensureElement('.modal__contact'), eventEmitter, 'contact')
const resultModal = new ResultModal(ensureElement('.modal__result'), eventEmitter, 'result')

api.get('/product')
    .then((result: IGetProductsResponse) => {
        globalStore.setProducts(result.items)
        result.items.forEach((item: IProduct) => {
            const cardTemplate = cloneTemplate('#card-catalog')
            const productCard = new ProductCard(eventEmitter, cardTemplate, item.id, item.title, item.description, item.category, item.image, item.price )
            viewManager.renderProduct(productCard.getElement())
        })
    })
    .catch((error) => {
        console.error('Ошибка получения товаров:', error);
    });

eventEmitter.on('card:click', (product: IProduct) => {
    console.log('Клик по карточке')
    productModal.render(product, globalStore.isProductInBasket(product))
})

eventEmitter.on('card:close', () => {
    console.log('Закрытие карточки')
    productModal.close()
})

eventEmitter.on('product:put', (product: IProduct) => {
    console.log('Товар в корзине')
    globalStore.addBasketProducts(product)
    viewManager.displayBasketCounter(globalStore.orderCount())
})

eventEmitter.on('product:delete', (product: IProduct) => {
    console.log('Удаление товара')
    globalStore.deleteBasketProducts(product)
    viewManager.displayBasketCounter(globalStore.orderCount())
})

eventEmitter.on('basket:open', () => {
    console.log('Клик по корзине')
    basketModal.render(globalStore.getBasketProducts(), globalStore.orderAmount())
})

eventEmitter.on('basket:close', () => {
    console.log('Закрыте корзины')
    basketModal.close()
})

eventEmitter.on('basket:delete', (product: IProduct) => {
    console.log('Удаление товара')
    globalStore.deleteBasketProducts(product)
    basketModal.render(globalStore.getBasketProducts(), globalStore.orderAmount())
    viewManager.displayBasketCounter(globalStore.orderCount())
})

eventEmitter.on('delivery:open', () => {
    console.log('Переход на оформление')
    deliveryModal.render()
    basketModal.close()
})

eventEmitter.on('delivery:close', () => {
    console.log('Закрыте заказа')
    deliveryModal.close()
})

eventEmitter.on('delivery:save', (delivery: IDelivery) => {
    console.log('Сохранение доставки')
    globalStore.setDelivery(delivery)
})

eventEmitter.on('contact:open', () => {
    console.log('Переход на контакты')
    contactModal.render()
    deliveryModal.close()
})

eventEmitter.on('contact:close', () => {
    console.log('Закрыте контактов')
    contactModal.close()
})

eventEmitter.on('contact:save', (contact: IContact) => {
    console.log('Сохранение контактов')
    globalStore.setContact(contact)
    api.post('/order', globalStore.getOrder()) 
        .then((response: IPostOrderResponse) => {
            globalStore.cleaningBasketProducts()
            viewManager.displayBasketCounter(globalStore.orderCount())
            eventEmitter.emit('result:open', response)
            
        })
        .catch((error) => {
            console.error('Ошибка отправки заказа:', error);
        });
})

eventEmitter.on('result:open', (response: IPostOrderResponse) => {
    console.log('Переход на результат ')
    resultModal.render(response.total)
    contactModal.close()
})

eventEmitter.on('result:close', () => {
    console.log('Возвращение к покупкам')
    resultModal.close()
})
