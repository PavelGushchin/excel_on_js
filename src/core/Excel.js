import {Dispatcher} from './Dispatcher';

export class Excel {
  constructor(options) {
    this.components = options.components;
    this.store = options.store;
    this.dispatcher = new Dispatcher();
  }

  render(selector) {
    const $mainContainer = document.querySelector(selector);

    this.components.forEach((component) => {
      $mainContainer.append(component.getRootElement());

      component.setDispatcher(this.dispatcher).init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }
}
