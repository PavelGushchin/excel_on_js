import {Component} from '../Component';
import {createTable} from './table.template';

export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table', ['mousedown', 'mouseup']);
  }

  content() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('Resizing: ', event.target.dataset.resize);
      console.log('MouseDOWN event');
      this.registerDOMListeners(['mousemove']);
    }
  }

  onMousemove(event) {
    console.log('MouseMOVE event');
  }

  onMouseup(event) {
    console.log('MouseUP event');
    this.removeDOMListeners(['mousemove']);
  }
}
