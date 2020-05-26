import {$} from '../../core/dom';
import {StoreSubscriber} from '../../core/StoreSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components;
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  init() {
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const optionsComponent = {
      store: this.store
    }
    this.components = this.components.map(Component => {
      const $container = $.create('section', Component.className)
      const component = new Component($container, optionsComponent);
      $container.html(component.toHtml())
      $root.append($container);
      return component;
    })
    return $root;
  }
}
