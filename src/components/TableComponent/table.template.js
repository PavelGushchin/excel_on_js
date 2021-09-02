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

function convertToHeaderCell(letter, index) {
  return `
      <div class="column" data-resizable="true" data-x="${index}">
          ${letter}
          <div class="col-resizer" data-what-resizing="col"></div>
      </div>
  `;
}

function convertToCell(_, index) {
  return `
      <div class="cell" contenteditable data-x="${index}"></div>
  `;
}

function createRow(content, index = 0) {
  const resizer = '<div class="row-resizer" data-what-resizing="row"></div>';

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
