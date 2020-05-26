import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      ...options,
      name: 'Formula',
      listeners: []
    });
  }

  toHtml() {
    return `   

            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>

      `
  }
}
