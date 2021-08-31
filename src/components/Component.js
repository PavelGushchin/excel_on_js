import {capitalizeFirstLetter} from '../core/utils';

export class Component {
  constructor(rootTag, rootClass, listeners = []) {
    this.$root = document.createElement(rootTag);
    this.$root.classList.add(rootClass);
    this.$root.innerHTML = this.content();

    this.listeners = listeners;
    this.registerDOMListeners();
  }

  content() {
    return `You have to override this method for ${this.$root}!`;
  }

  getHtml() {
    return this.$root.outerHTML;
  }

  getRootElement() {
    return this.$root;
  }

  registerDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);

      if (! this[methodName]) {
        throw new Error(`Method "${methodName}" is not defined in ${this.$root}!`);
      }

      this[methodName] = this[methodName].bind(this);
      this.$root.addEventListener(listener, this[methodName]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);

      this.$root.removeEventListener(listener, this[methodName]);
    });
  }
}


function getMethodName(eventName) {
  // click => onClick
  return 'on' + capitalizeFirstLetter(eventName);
}
