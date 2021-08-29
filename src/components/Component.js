import {capitalizeFirstLetter} from '../core/utils';

export class Component {
  constructor(rootTag, rootClass, listeners = []) {
    this.$root = document.createElement(rootTag);
    this.$root.classList.add(rootClass);
    this.$root.innerHTML = this.content();

    this.initDOMListeners(listeners);
  }

  content() {
    throw new Error('You have to override this method!');
  }

  toHtml() {
    return this.$root.outerHTML;
  }

  getRoot() {
    return this.$root;
  }

  initDOMListeners(listeners) {
    this.listeners = listeners;

    this.listeners.forEach((listener) => {
      const methodName = 'on' + capitalizeFirstLetter(listener);

      if (! this[methodName]) {
        throw new Error(`Method "${methodName}" is not defined!`);
      }

      this.$root.addEventListener(listener, this[methodName].bind(this));
    });
  }
}
