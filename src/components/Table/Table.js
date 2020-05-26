import {ExcelComponent} from '../../core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Table',
      listeners: []
    });
  }

  toHtml() {
    return `
            <div class="row">

                <div class="row-info">&nbsp;</div>

                <div class="row-data">
                    <div class="column">A</div>
                    <div class="column">B</div>
                    <div class="column">C</div>
                    <div class="column">D</div>
                </div>

            </div>
            <div class="row">

                <div class="row-info">1</div>

                <div class="row-data">
                    <div class="cell selected" contenteditable>as</div>
                    <div class="cell" contenteditable>A1</div>
                    <div class="cell" contenteditable>b2</div>
                    <div class="cell" contenteditable>c3</div>
                </div>

            </div>
            <div class="row">

                <div class="row-info">2</div>

                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>

            </div>
        `
  }
}
