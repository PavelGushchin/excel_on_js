import {Dispatcher} from './Dispatcher';

export class Excel {
  constructor(components = []) {
    this.components = components;
    this.dispatcher = new Dispatcher();
  }

  render(selector) {
    const $mainContainer = document.querySelector(selector);

    this.components.forEach((Component) => {
      const component = new Component();
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
