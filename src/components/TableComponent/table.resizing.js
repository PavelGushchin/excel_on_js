import {css} from '../../core/utils';


export function resize(event, $root) {
  const $resizer = event.target;
  const $resizedHeaderCell = $resizer.closest('[data-resizable="true"]');
  const coords = $resizedHeaderCell.getBoundingClientRect();
  const whatResizing = $resizer.dataset.whatResizing;

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
    } else if (whatResizing === 'row') {
      const delta = e.pageY - coords.bottom;
      newHeight = coords.height + delta + 'px';

      css($resizer, {bottom: -delta + 'px'});
    }
  };

  document.onmouseup = () => {
    if (whatResizing === 'col') {
      const cellsToResize = $root.querySelectorAll(`[data-x="${$resizedHeaderCell.dataset.x}"]`);

      css($resizedHeaderCell, {width: newWidth});

      cellsToResize.forEach(($cell) => {
        css($cell, {width: newWidth});
      });
    } else if (whatResizing === 'row') {
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
