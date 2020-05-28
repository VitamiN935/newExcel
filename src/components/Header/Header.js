import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle, updateDate} from '@core/store/actions';
import {$} from '@core/dom';
import {createHeader} from './Header.template';
import {ActiveRoute} from '@core/router/ActiveRoute';
import {debounse} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Header',
      listeners: ['input', 'click']
    });
  }

  prepare() {
    this.onInput = debounse(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target);
    console.log($target.data.type)
    if ($target.data.type === 'delete') {
      localStorage.removeItem(ActiveRoute.path)
      document.location.hash = '#'
    } else if ($target.data.type === 'exit') {
      this.$dispatch(updateDate(new Date().toLocaleString()))
      document.location.hash = '#'
    }
  }

  toHtml() {
    return createHeader(this.$getState())
  }
}
