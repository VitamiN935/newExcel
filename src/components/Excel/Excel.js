import {$} from '../../core/dom';

export class Excel {
  constructor(options) {
    this.components = options.components;
    this.store = options.store;
  }

  init() {

  }

  destroy() {

  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components.forEach(Component => {
      const $container = $.create('section', Component.className)
      const component = new Component();
      $container.html(component.toHtml())
      $root.append($container);
    })
    return $root;
  }
}
