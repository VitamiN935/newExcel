import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/Table.template';
// eslint-disable-next-line max-len
import {isResize, matrix, nextSelector, toNextCell} from '@/components/Table/Table.functions';
import {TableSelector} from '@/components/Table/TableSelector';
import {$} from '@core/dom';
import * as actions from '@core/store/actions';
import {resizeHandler} from '@/components/Table/Table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input']
    });
  }

  prepare() {
    this.selector = new TableSelector();
  }

  init() {
    super.init();
    this.selector.select(this.$root.find(`[data-id="0:0"]`))
  }

  async isTableResize(event) {
    const data = await resizeHandler(this.$root, event);
    this.$dispatch(actions.tableResize(data))
  }

  onKeydown(event) {
    if (toNextCell(event)) {
      event.preventDefault()
      const id = this.selector.$current.id(true)
      const key = event.key;
      const $targetCell = this.$root.find(nextSelector(key, id));
      this.selector.select($targetCell)
    }
  }

  onInput() {
    this.$dispatch(actions.changeText({
      id: this.selector.$current.id(),
      value: this.selector.$current.text(),
    }))
  }

  onMousedown(event) {
    if (isResize(event)) {
      this.isTableResize(event)
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
    return createTable(20, this.$getState())
  }
}


