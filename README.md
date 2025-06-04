# Проектная работа "Веб-ларек"

Ссылка на GitHub: https://github.com/KatyaVarentsova/web-larek-frontend

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
Приложение будет разработано с использованием архитектурного паттерна MVP:
Model – слой данных, отвечает за хранение и управление данными приложения (ICardItem, IBasket, IUser и утилиты (TOrder, TUserContacts, TSuccessfulPayment))
View – слой предсталвния, отвечает за отоброжение данных на странице (ICardsList, модальные окна, форма доставки и оплаты)
Presenter – связывает данные с предсталвнием

### Описание базовых классов (Model)
#### ICardItem - модель товара
Представляет данные одного товара в каталоге.
Свойства:
id - уникальный индентификатор
description, image, title, category - данные товара
price - цена, может быть null
#### IBasket - модель корзины
Управляет состоянием и содержанием корзины. 
Свойства: 
items - Map<id, count>, хранит товары и их кол-во.
add(id) - добовляет товар по ID.
remove(id) - удаляет товар по ID.
totalPrice(prices) - метод возвращает итоговую сумму.
#### IUser - модель пользователя/покупателя
paymentOnline - способ оплаты
email, phone, address - контактные данные
#### Утилитарные типы:
TOrder - подмодель заказа (paymentOnline, address)
TUserContacts - подмодель контактов (email, phone)
TSuccessfulPayment - подмодель успешной оплаты (totalPrice)
Эти типы используются в логике Presenter и в проверке заполнения форм. 
### Описание компонентов (View) и их связь с Presenter
#### ICardsList - компонент списка товаров.
Отвечает только за отрисовку карточек товаров.
Метод drawCard(cards) - получает список карточек от Presenter и отображает их на экране.
