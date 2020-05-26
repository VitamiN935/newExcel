import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners) {
    if (!$root) {
      throw new Error(`root on DomListener not defined`)
    }

    this.$root = $root;
    this.listeners = listeners || [];
  }

  initDomListeners() {
    this.listeners.forEach(eventName => {
      const method = getNameMethod(eventName);
      if (!this[method]) {
        throw new Error(
            `Method: ${method}, in component: ${this.name} not implemented`
        )
      } else {
        this[method] = this[method].bind(this);
        this.$root.on(eventName, this[method])
      }
    })
  }

  removeDomListeners() {
    this.listeners.forEach(eventName => {
      const method = getNameMethod(eventName);
      this.$root.off(eventName, this[method])
    })
  }
}


function getNameMethod(eventName) {
  return 'on' + capitalize(eventName);
}
