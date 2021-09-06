export function createTable(width = 26, height = 50) {
  const rows = [];

  const headerRow = new Array(width)
      .fill('')
      .map(convertToLetter)
      .map(convertToHeaderCell)
      .join('')
  ;

  rows.push(createRow(headerRow));

  for (let rowLineIndex = 1; rowLineIndex <= height; rowLineIndex++) {
    const row = new Array(width)
        .fill('')
        .map(convertToCell(rowLineIndex))
        .join('')
    ;

    rows.push(createRow(row, rowLineIndex));
  }

  return rows.join('');
}


const CODES = {
  A: 65,
  Z: 90,
};

function convertToLetter(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function convertToHeaderCell(letter, index) {
  return `
      <div class="column" data-resizable="true" data-x="${index + 1}">
          ${letter}
          <div class="col-resizer" data-type="resizer" data-what-resizing="col"></div>
      </div>
  `;
}

function convertToCell(rowLineIndex) {
  return function(_, index) {
    return `
        <div class="cell" data-type="cell" data-x="${index + 1}" data-y="${rowLineIndex}" contenteditable></div>
    `;
  };
}

function createRow(content, index = 0) {
  const resizer = '<div class="row-resizer" data-type="resizer" data-what-resizing="row"></div>';

  return `
      <div class="row" data-resizable="true">
          <div class="row-info">
              ${index ? index + resizer : ''}
          </div>
          
          <div class="row-data">
              ${content}
          </div>
      </div>
  `;
}
