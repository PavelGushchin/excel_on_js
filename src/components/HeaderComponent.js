import {Component} from './Component';

export class HeaderComponent extends Component {
  className = 'excel__header';

  toHtml() {
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
