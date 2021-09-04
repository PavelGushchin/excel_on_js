import {Component} from '../Component';
import {createTable} from './table.template';
import {css} from '../../core/utils';


export class TableComponent extends Component {
  constructor() {
    super('div', 'excel__table', ['mousedown']);
  }

  content() {
    return createTable();
  }

  onMousedown(event) {
    const whatResizing = event.target.dataset.whatResizing;

    if (whatResizing === undefined) {
      return;
    }

    const $resizer = event.target;
    const $resizedHeaderCell = $resizer.closest('[data-resizable="true"]');
    const coords = $resizedHeaderCell.getBoundingClientRect();
    let newWidth;
    let newHeight;

    css($resizer, {
      opacity: '1',
      [whatResizing === 'col' ? 'bottom' : 'right']: '-4000px',
    });

    document.onmousemove = (e) => {
      if (whatResizing === 'col') {
        const delta = e.pageX - coords.right;
        newWidth = coords.width + delta + 'px';

        css($resizer, {right: -delta + 'px'});
      } else {
        const delta = e.pageY - coords.bottom;
        newHeight = coords.height + delta + 'px';

        css($resizer, {bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      if (whatResizing === 'col') {
        const cellsToResize = this.$root.querySelectorAll(`[data-x="${$resizedHeaderCell.dataset.x}"]`);

        css($resizedHeaderCell, {width: newWidth});

        cellsToResize.forEach(($cell) => {
          css($cell, {width: newWidth});
        });
      } else {
        css($resizedHeaderCell, {height: newHeight});
      }

      css($resizer, {
        opacity: '0',
        right: '0',
        bottom: '0',
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
}
