import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error(`Router should selector from root app`);
    }
    this.$app = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePage)
    this.changePage();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage)
  }

  changePage() {
    if (this.page) {
      this.page.destroy();
    }
    this.$app.clear();

    const Page = ActiveRoute.path.includes('excel') ?
      this.routes.excel : this.routes.main
    this.page = new Page(ActiveRoute.params);
    this.$app.append(this.page.getRoot())
  }
}
