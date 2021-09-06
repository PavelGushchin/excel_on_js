import {Component} from '../Component';
import {createTable} from './table.template';
import {resize} from './table.resizing';


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
    this.clearSelection();

    const $cell = this.$root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    this.selectedCells.push($cell);

    $cell.classList.add('selected');
  }

  clearSelection() {
    this.selectedCells.forEach(($cell) => {
      $cell.classList.remove('selected');
    });

    this.selectedCells = [];
  }

  onMousedown(event) {
    switch (event.target.dataset.type) {
      case 'resizer':
        resize(event, this.$root);
        break;
      case 'cell':
        const data = event.target.dataset;
        this.selectCell(data.x, data.y);
        break;
    }
  }
}
