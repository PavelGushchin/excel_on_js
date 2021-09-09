import {capitalizeFirstLetter} from './utils';
import {Emitter} from './Emitter';

export class Component {
  constructor(rootTag, rootClass, listeners = []) {
    this.$root = document.createElement(rootTag);
    this.$root.classList.add(rootClass);
    this.$root.innerHTML = this.content();

    this.emitter = new Emitter();
    this.unsubscribers = [];

    this.registerDOMListeners(listeners);
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

  init() {}

  destroy() {
    this.unsubscribers.forEach((unsub) => {
      unsub();
    });
  }

  on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  dispatch(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  registerDOMListeners(listeners) {
    this.listeners = listeners;

    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);

      if (! this[methodName]) {
        throw new Error(`Method "${methodName}" is not defined in ${this.$root}!`);
      }

      this[methodName] = this[methodName].bind(this);
      this.$root.addEventListener(listener, this[methodName]);
    });
  }

  removeDOMListeners(listeners = []) {
    listeners.forEach((listenerToRemove) => {
      this.listeners.forEach((registeredListener, index) => {
        if (listenerToRemove === registeredListener) {
          const methodName = getMethodName(registeredListener);
          this.$root.removeEventListener(registeredListener, this[methodName]);

          this.listeners.splice(index, 1);
        }
      });
    });
  }
}


function getMethodName(eventName) {
  // click => onClick
  return 'on' + capitalizeFirstLetter(eventName);
}
