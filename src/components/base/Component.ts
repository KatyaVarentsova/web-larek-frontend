import { IEvents } from "./events";

export abstract class Component {
    protected element: HTMLElement;
    protected events: IEvents;

    constructor(events: IEvents, elementsBlock: HTMLElement) {
        this.events = events

        this.element = this.createElement(elementsBlock)
        this.addEventListeners()
    }

    protected createElement(elementsBlock: HTMLElement): HTMLElement { 
        return elementsBlock
    }

    protected addEventListeners(): void {}

    getElement() {
        return this.element
    }
}