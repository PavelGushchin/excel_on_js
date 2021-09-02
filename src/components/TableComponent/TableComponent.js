import {Component} from '../Component';
import {createTable} from './table.template';

export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table', ['mousedown']);
  }

  content() {
    return createTable();
  }

  onMousedown(event) {
    console.log('MouseDOWN event');

    const whatResizing = event.target.dataset.whatResizing;

    if (whatResizing === undefined) {
      return;
    }

    const $resizer = event.target;
    const $resizedHeaderCell = $resizer.closest('[data-resizable="true"]');
    const coords = $resizedHeaderCell.getBoundingClientRect();
    let newWidth;
    let newHeight;

    $resizer.style.opacity = '1';

    document.onmousemove = (e) => {
      console.log('MouseMOVE event');

      if (whatResizing === 'col') {
        const delta = e.pageX - coords.right;
        $resizer.style.right = -delta + 'px';
        $resizer.style.bottom = '-3000px';

        newWidth = coords.width + delta + 'px';
      } else if (whatResizing === 'row') {
        const delta = e.pageY - coords.bottom;
        $resizer.style.bottom = -delta + 'px';
        $resizer.style.right = '-4000px';

        newHeight = coords.height + delta + 'px';
      } else {
        throw new Error('Unknown type of resized element: ' + whatResizing);
      }
    };

    document.onmouseup = (e) => {
      console.log('MouseUP event');
      document.onmousemove = null;
      document.onmouseup = null;
      $resizer.style['opacity'] = 0;
      $resizedHeaderCell.style.width = newWidth;
    };
  }
}
