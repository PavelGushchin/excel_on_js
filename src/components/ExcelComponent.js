import {Component} from '../core/Component';
import {FormulaComponent} from './FormulaComponent';
import {HeaderComponent} from './HeaderComponent';
import {ToolbarComponent} from './ToolbarComponent';
import {TableComponent} from './TableComponent';

export class ExcelComponent extends Component {
  render(selector) {
    const $rootElement = document.querySelector(selector);

    const headerHtml = new HeaderComponent().toHtml();
    const toolbarHtml = new ToolbarComponent().toHtml();
    const formulaHtml = new FormulaComponent().toHtml();
    const tableHtml = new TableComponent().toHtml();

    $rootElement.innerHTML = `
      <div class="excel">
        ${headerHtml}
        ${toolbarHtml}
        ${formulaHtml}
        ${tableHtml}
      </div>
    `;
  }
}
