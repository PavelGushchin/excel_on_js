import {Component} from '../../core/Component';

export class Formula extends Component {
  constructor() {
    super('div', 'excel__formula', ['input', 'click']);
  }

  content() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(event.target.textContent.trim());
  }

  onClick(event) {
    console.log(this.$root);
    console.log(event.target);
  }
}
