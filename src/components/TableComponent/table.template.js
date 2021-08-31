export function createTable(WIDTH = 26, HEIGHT = 50) {
  const rows = [];

  const headerRow = new Array(WIDTH)
      .fill('')
      .map(convertToLetter)
      .map(convertToHeaderCell)
      .join('')
  ;

  rows.push(createRow(headerRow));

  for (let index = 1; index <= HEIGHT; index++) {
    const row = new Array(WIDTH)
        .fill('')
        .map(convertToCell)
        .join('')
    ;

    rows.push(createRow(row, index));
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

function convertToHeaderCell(letter) {
  return `
      <div class="column">
          ${letter}
          <div class="col-resize" data-resize="col"></div>
      </div>
  `;
}

function convertToCell() {
  return `
      <div class="cell" contenteditable></div>
  `;
}

function createRow(content, index = 0) {
  const resizer = '<div class="row-resize" data-resize="row"></div>';

  return `
      <div class="row">
          <div class="row-info">
              ${index ? index + resizer : ''}
          </div>
          
          <div class="row-data">
              ${content}
          </div>
      </div>
  `;
}
