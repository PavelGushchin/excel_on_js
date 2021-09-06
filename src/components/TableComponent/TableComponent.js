import {Component} from '../Component';
import {createTableInHtml} from './table.template';
import {resize} from './table.resizing';


export class TableComponent extends Component {
  static WIDTH = 26;
  static HEIGHT = 50;

  constructor() {
    super('div', 'excel__table', ['mousedown']);

    this.selectedCells = [];
    this.$currentCell = this.getCell(1, 1);
    this.select(this.$currentCell);
  }

  content() {
    return createTableInHtml();
  }

  getCell(x, y) {
    return this.$root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  }

  select($cell) {
    this.clear();

    this.selectedCells.push($cell);
    this.$currentCell = $cell;
    $cell.classList.add('selected');
  }

  selectMany($startCell, $endCell) {

  }

  clear() {
    this.selectedCells.forEach(($cell) => {
      $cell.classList.remove('selected');
    });

    this.selectedCells = [];
  }

  onMousedown(event) {
    const dataset = event.target.dataset;

    if (dataset.type === 'resizer') {
      resize(event, this.$root);
    } else if (dataset.type === 'cell') {
      this.select(
          this.getCell(dataset.x, dataset.y)
      );
    }
  }
}
