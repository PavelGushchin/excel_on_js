import {Component} from '../../core/Component';

export class Header extends Component {
  constructor() {
    super('div', 'excel__header');
  }

  content() {
    return `
      <input type="text" class="input" value="Новая таблица" />
      <div>
          <div class="button">
              <i class="material-icons">delete</i>
          </div>

          <div class="button">
              <i class="material-icons">exit_to_app</i>
          </div>
      </div>
    `;
  }
}
