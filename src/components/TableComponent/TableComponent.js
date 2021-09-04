import {Component} from '../Component';
import {createTable} from './table.template';
import {resizeHandler, shouldResize} from './table.resizing';


export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table', ['mousedown']);
  }

  content() {
    return createTable();
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
  }
}
