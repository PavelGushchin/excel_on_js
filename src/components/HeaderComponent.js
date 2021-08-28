import {Component} from './Component';

export class HeaderComponent extends Component {
  toHtml() {
    return `
      <div class="excel__header">
          <input type="text" class="input" value="Новая таблица" />
          <div>
              <div class="button">
                  <i class="material-icons">delete</i>
              </div>

              <div class="button">
                  <i class="material-icons">exit_to_app</i>
              </div>
          </div>
      </div>
    `;
  }
}
