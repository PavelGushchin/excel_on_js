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
    this.selectCell(this.$currentCell);
  }

  content() {
    return createTableInHtml();
  }

  getCell(x, y) {
    return this.$root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  }

  selectCell($cell) {
    this.selectedCells.push($cell);
    this.$currentCell = $cell;
    $cell.classList.add('selected');
  }

  selectManyCells($startCell, $endCell) {
    let startX = parseInt($startCell.dataset.x);
    let startY = parseInt($startCell.dataset.y);

    let endX = parseInt($endCell.dataset.x);
    let endY = parseInt($endCell.dataset.y);

    if (startX > endX) {
      [startX, endX] = [endX, startX];
    }

    if (startY > endY) {
      [startY, endY] = [endY, startY];
    }

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        const $cell = this.getCell(i, j);
        this.selectedCells.push($cell);
        $cell.classList.add('selected');
      }
    }

    this.$currentCell = $startCell;
  }

  clearPreviousSelection() {
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
      const $clickedCell = this.getCell(dataset.x, dataset.y);

      if (event.shiftKey) {
        this.clearPreviousSelection();
        this.selectManyCells(this.$currentCell, $clickedCell);
      } else if (event.ctrlKey) {
        this.selectCell($clickedCell);
      } else {
        this.clearPreviousSelection();
        this.selectCell($clickedCell);
      }
    }
  }
}
