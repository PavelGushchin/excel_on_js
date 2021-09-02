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
        newWidth = coords.width + delta + 'px';

        $resizer.style.right = -delta + 'px';
        $resizer.style.bottom = '-3000px';
      } else if (whatResizing === 'row') {
        const delta = e.pageY - coords.bottom;
        newHeight = coords.height + delta + 'px';

        $resizer.style.bottom = -delta + 'px';
        $resizer.style.right = '-4000px';
      }
    };

    document.onmouseup = () => {
      console.log('MouseUP event');
      document.onmousemove = null;
      document.onmouseup = null;

      if (whatResizing === 'col') {
        const cellsToResize = this.$root.querySelectorAll(`[data-x="${$resizedHeaderCell.dataset.x}"]`);

        $resizedHeaderCell.style.width = newWidth;
        cellsToResize.forEach(($cell) => {
          $cell.style.width = newWidth;
        });

        $resizer.style.right = '0px';
      } else if (whatResizing === 'row') {
        $resizedHeaderCell.style.height = newHeight;
        $resizer.style.bottom = '0px';
      }

      $resizer.style.opacity = '0';
    };
  }
}
