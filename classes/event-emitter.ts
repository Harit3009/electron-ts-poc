export class EventEmitter {
  listeners: { [name: string]: Function[] } = {};

  emit(eventName: string, data?: any) {
    this.listeners[eventName]?.forEach((callback) =>
      setTimeout(callback.apply(this, [this, ...data]), 0)
    );
  }

  on(name: string, callback: Function) {
    if (typeof callback === "function" && typeof name === "string") {
      if (!this.listeners[name]) this.listeners[name] = [];
      this.listeners[name].push(callback);
    }
  }

  off(eventName: string, callback: Function) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => !(listener === callback)
    );
  }

  destroy() {
    this.listeners = {};
  }
}
