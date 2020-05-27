const CODE = {
  A: 65,
  Z: 90
}

function createRow(content, row = 0) {
  const resize = row !== 0 ?
    `<div class="row-resize" data-resize="row"></div>` : ''
  return `<div 
          class="row" 
          data-type="resizable"
          data-row="${row - 1}">
                <div class="row-info">${row !== 0 ? row : ''}${resize}</div>
                <div class="row-data">
                    ${content}
                </div>
            </div>`
}

function toChar(_, idx) {
  return String.fromCharCode(CODE.A + idx);
}

function createColumn(ch, col) {
  const resize = `<div class="col-resize"  data-resize="col"></div>`
  return `<div 
            class="column" 
            data-type="resizable"
            data-col="${col}"
          >${ch}${resize}</div>`
}

function createCell(row) {
  return function(_, col) {
    const id = `${row}:${col}`
    return `<div 
              class="cell" 
              contenteditable 
              data-col="${col}"
              data-id="${id}"
            ></div>`
  }
}

export function createTable(rowCount = 15) {
  const colCount = CODE.Z - CODE.A + 1
  const rows = [];

  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowCount; row += 1) {
    const cells = new Array(colCount)
        .fill('')
        .map(createCell(row))
        .join('')

    rows.push(createRow(cells, row + 1))
  }

  return rows.join('');
}
