import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options.listeners);
    this.store = options.store;
    this.name = options.name || '';
    this.subscribers = options.subscribers || [];
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $getState() {
    return this.store.getState()
  }

  isWatching(key) {
    return this.subscribers.includes(key);
  }

  changedStore() {
  }

  toHtml() {
    return ``
  }
}


