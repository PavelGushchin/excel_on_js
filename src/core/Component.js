import {capitalizeFirstLetter} from './utils';

export class Component {
  constructor(componentName, listeners = []) {
    this.componentName = componentName.toUpperCase();

    this.$root = document.createElement('div');
    this.$root.classList.add(`excel__${componentName.toLowerCase()}`);
    this.$root.innerHTML = this.content();

    this.unsubscribers = [];

    this.registerDOMListeners(listeners);
  }

  content() {
    return `You have to override this method in ${this.componentName} component!`;
  }

  getHtml() {
    return this.$root.outerHTML;
  }

  getRootElement() {
    return this.$root;
  }

  subscribe(event, callback) {
    if (! this.dispatcher) {
      throw new Error(`Dispatcher isn't set in ${this.componentName} component`);
    }

    const unsub = this.dispatcher.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  dispatch(event, ...args) {
    if (! this.dispatcher) {
      throw new Error(`Dispatcher isn't set in ${this.componentName} component`);
    }

    this.dispatcher.dispatch(event, ...args);
  }

  registerDOMListeners(listeners) {
    this.listeners = listeners;

    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener);

      if (! this[methodName]) {
        throw new Error(`Method "${methodName}" is not defined in ${this.componentName} component!`);
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

  init() {}

  setDispatcher(dispatcher) {
    this.dispatcher = dispatcher;
    return this;
  }

  destroy() {
    this.unsubscribers.forEach((unsub) => {
      unsub();
    });
  }
}


function getMethodName(eventName) {
  // click => onClick
  return 'on' + capitalizeFirstLetter(eventName);
}
