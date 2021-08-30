import {capitalizeFirstLetter} from '../core/utils';

export class Component {
  constructor(rootTag, rootClass, listeners = []) {
    this.rootTag = rootTag;
    this.rootClass = rootClass;
    this.listeners = listeners;

    this.$root = document.createElement(rootTag);
    this.$root.classList.add(rootClass);
    this.$root.innerHTML = this.content();

    this.initDOMListeners();
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

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);

      if (! this[methodName]) {
        throw new Error(`Method "${methodName}" is not defined in ${this.rootClass}!`);
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
