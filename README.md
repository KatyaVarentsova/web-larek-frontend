# Проектная работа "Веб-ларек"
Веб-ларёк - это онлайн магазин для необходимых мелочей веб-разработчик.

Ссылка на GitHub: https://github.com/KatyaVarentsova/web-larek-frontend

## Описание

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура приложения 
Код приложения разделен на слои согласно парадигме MVP:
- Model — отвечает за данные, бизнес-логику, хранение и обработку состояния
- View — слой представления, отвечает за отображение данных на странице,
- Presenter — отвечает за связь представления и данных.

### Model

#### Класс GlobalStore
Хранит продукты, корзину, доставку, контакты, заказ.

Предоставляет методы управления состоянием:
```TypeScript
interface IGlobalStore {
    setProducts(products: IProduct[]): void;
    getBasketProducts(): IProduct[];
    addBasketProducts(product: IProduct): void;
    deleteBasketProducts(product: IProduct): void;
    cleaningBasketProducts(): void;
    isProductInBasket(product: IProduct): boolean;
    orderAmount(): number;
    orderCount(): number;
    allProductsID(): string[];
    setDelivery(delivery: IDelivery): void;
    getDelivery(): IDelivery;
    setContact(contact: IContact): void;
    getContact(): IContact;
    getOrder(): IOrderRequestBody;
}
```

#### Типы 
Контракты для классов.
```TypeScript
interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
}
```

```TypeScript
interface IDelivery {
    payment: string,
    address: string,
}
```

```TypeScript
interface IContact {
    email: string,
    phone: string,
}
```

```TypeScript
interface IOrder extends IDelivery, IContact {
    total: number,
    items: string[]
}
```

#### Класс Api
Взаимодействие с сервером.
- get — загрузка списка товаров
- post — отправка заказа

### View 
Работает только с DOM и отображением. Никакой бизнес-логики, только UI.
#### Класс ViewManager
Управляет "глобальным" отображением (шапка, счетчик корзины, галерея).
```TypeScript
interface IViewManager {
    renderProduct(elementNode: HTMLElement):void,
    addEventBasket():void,
    displayBasketCounter(orderCounte: number):void
}
```

#### Компоненты:
##### Абстрактный класс Component
```TypeScript
createElement(elementsBlock: HTMLElement): HTMLElement{},
addEventListeners(): void {}
```
###### Наследники:
- ProductCard — отвечает за отрисовку карточки товара.
- Modal — абстрактный класс для модальных окон.

##### Абстрактный класс Modal
```TypeScript
addEventListeners(): void {},
open(),
close()
```
###### Наследники:
- BasketModal — модалка корзины.
- ProductModal — модалка карточки товара.
- DeliveryModal — форма доставки.
- ContactModal — форма контактов.
- ResultModal — модалка после оформления заказа.

### Presenter
Посредник между Model и View — index.ts.
Подписывается на события View, вызывает методы Model, а затем обновляет View.
#### Описание событий 
- card:click — открыть карточку товара.
- card:close — закрыть карточку товара.
- product:put — добавить товар в корзину.
- product:delete — удалить товар из корзины (через карточку).
- basket:open — открыть корзину.
- basket:close — закрыть корзину.
- basket:delete — удалить товар из корзины (через корзину).
- delivery:open — открыть форму доставки.
- delivery:close — закрыть форму доставки.
- delivery:save — сохранить данные доставки.
- contact:open — открыть форму контактов.
- contact:close — закрыть форму контактов.
- contact:save — сохранить контакты.
- result:open — открыть модалку успешного заказа.
- result:close — закрыть модалку успешного заказа.
