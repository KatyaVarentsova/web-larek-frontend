import './scss/styles.scss';
import { API_URL } from './utils/constants'
import { Api } from './components/base/api'
import { GlobalStore } from './components/GlobalStore'
import { IGetProductsResponse, IProduct } from './types';
import { ViewManager } from './components/ViewManager';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BasketModal } from './components/BasketModal';

const api = new Api(API_URL)
const globalStore = new GlobalStore()
const eventEmitter = new EventEmitter()
const viewManager = new ViewManager('.header', '.gallery', eventEmitter)
const productModal = new ProductModal(ensureElement('.modal__card'), eventEmitter)
const basketModal = new BasketModal(ensureElement('.modal__basket'), eventEmitter)

api.get('/product').then((result: IGetProductsResponse) => {
    globalStore.setProducts(result.items)
    result.items.forEach((item: IProduct) => {
        const clonnedCardTemplate = cloneTemplate('#card-catalog')
        const productCard = new ProductCard(item.id, item.title, item.description, item.category, item.image, item.price, clonnedCardTemplate, eventEmitter)
        viewManager.renderProduct(productCard.element)
    })
})

eventEmitter.on('card:click', (product: IProduct) => {
    console.log('Клик по карточке')
    productModal.open(product)
})

eventEmitter.on('card:close', () => {
    console.log('Закрытие карточки')
    productModal.close()
})

eventEmitter.on('basket:add', () => {
    console.log('Клик по корзине')
    basketModal.open(globalStore.getBasketProducts())
})

eventEmitter.on('product:put', (product: IProduct) => {
    console.log('Товар в корзине')
    globalStore.setBasketProducts(product)
})

eventEmitter.on('basket:close', () => {
    console.log('Закрыте корзины')
    basketModal.close()
})
