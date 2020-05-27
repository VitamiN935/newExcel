import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/Table.template';
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

  onMousedown(event) {
    if ($(event.target).data.resize) {
      const $resize = $(event.target);
      const $parent = $resize.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const type = $resize.data.resize;
      document.onmousemove = e => {
        const step = e.pageX - coords.right;
        const value = coords.width + step;
        $parent.css({width: value + 'px'})

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  }

  toHtml() {
    return createTable(20)
  }
}
