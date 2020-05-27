import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/Table.template';
// eslint-disable-next-line max-len
import {isResize, matrix, resizeHandler} from '@/components/Table/Table.functions';
import {TableSelector} from '@/components/Table/TableSelector';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  prepare() {
    this.selector = new TableSelector();
  }

  init() {
    super.init();
    this.selector.select(this.$root.find(`[data-id="0:0"]`))
  }

  async tableResize(event) {
    const data = await resizeHandler(this.$root, event);
    console.log(data);
  }

  onMousedown(event) {
    if (isResize(event)) {
      this.tableResize(event)
    } else {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $group = matrix($target, this.selector.$current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selector.selectGroup($group)
      } else {
        this.selector.select($target);
      }
    }
  }

  toHtml() {
    return createTable(20)
  }
}

