import {Component} from '../core/Component';

export class FormulaComponent extends Component {
  toHtml() {
    return `
      <div class="excel__formula">
          <div class="info">fx</div>
          <div class="input" contenteditable spellcheck="false"></div>
      </div>
    `;
  }
}
