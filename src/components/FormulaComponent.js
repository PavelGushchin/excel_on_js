import {Component} from './Component';

export class FormulaComponent extends Component {
  className = 'excel__formula';

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
