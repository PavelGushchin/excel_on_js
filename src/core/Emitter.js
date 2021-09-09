export class Emitter {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => {
        return listener !== callback;
      });
    };
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
