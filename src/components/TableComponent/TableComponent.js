import {Component} from '../Component';
import {createTable} from './table.template';

export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table');
  }

  content() {
    return createTable();
  }
}
