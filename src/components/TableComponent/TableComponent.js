import {Component} from '../Component';
import {createTable} from './table.template';
import {resizeHandler, shouldResize} from './table.resizing';


export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table', ['mousedown']);
    this.selectedCells = [];
    this.selectCell(1, 1);
  }

  content() {
    return createTable();
  }

  selectCell(x, y) {
    const $cell = this.$root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    $cell.classList.add('selected');

    this.selectedCells = [$cell];
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
  }
}
