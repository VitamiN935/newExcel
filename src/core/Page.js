export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Component Page, not implement method getRoot');
  }

  afterRender() {}

  destroy() {}
}
