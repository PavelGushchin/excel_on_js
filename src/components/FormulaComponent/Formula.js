import {Component} from '../../core/Component';

export class Formula extends Component {
  constructor() {
    super('Formula', ['keydown']);
  }

  content() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.dispatch('formula:enter');
    }
  }
}
