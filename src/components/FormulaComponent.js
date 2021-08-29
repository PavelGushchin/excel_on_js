import {Component} from './Component';

export class FormulaComponent extends Component {
  constructor() {
    super('div', 'excel__formula');
  }

  content() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
