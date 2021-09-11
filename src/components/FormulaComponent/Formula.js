import {Component} from '../../core/Component';

export class Formula extends Component {
  constructor() {
    super('Formula', ['keydown', 'input']);

    this.$formulaInput = this.$root.querySelector('#formula-input');
  }

  content() {
    return `
      <div class="info">fx</div>
      <div id="formula-input" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.subscribe('table:input', (text) => {
      this.$formulaInput.textContent = text;
    });

    this.subscribe('table:cell:selected', (text) => {
      this.$formulaInput.textContent = text;
    });
  }

  onInput(event) {
    this.dispatch('formula:input', event.target.textContent);
  }

  onKeydown(event) {
    const doneKeys = ['Enter', 'Tab'];

    if (doneKeys.includes(event.key)) {
      event.preventDefault();
      this.dispatch('formula:done');
    }
  }
}
