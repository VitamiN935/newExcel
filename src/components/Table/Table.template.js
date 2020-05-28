const CODE = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH_COLUMN = 120
const DEFAULT_HEIGHT_ROW = 22

function createRow(content, row = -1, state = {}) {
  const height = (state[row - 1] || DEFAULT_HEIGHT_ROW) + 'px'
  const resize = row !== -1 ?
    `<div class="row-resize" data-resize="row"></div>` : ''
  return `<div 
          class="row" 
          style="height: ${height}"
          data-type="resizable"
          data-row="${row - 1}">
                <div class="row-info">${row !== -1 ? row : ''}${resize}</div>
                <div class="row-data">
                    ${content}
                </div>
            </div>`
}

function createColumn({ch, col, width}) {
  const resize = `<div class="col-resize"  data-resize="col"></div>`
  return `<div 
            class="column" 
            data-type="resizable"
            data-col="${col}"
            style="width: ${width}"
          >${ch}${resize}</div>`
}

function createCell(row, state) {
  return function({col, width}) {
    const id = `${row}:${col}`
    const data = state[id] || ''
    return `<div 
              style="width: ${width}"
              class="cell" 
              contenteditable 
              data-col="${col}"
              data-id="${id}"
            >${data || ''}</div>`
  }
}

function toChar(_, idx) {
  return String.fromCharCode(CODE.A + idx);
}

function getWidth(state, id) {
  return (state[id] || DEFAULT_WIDTH_COLUMN) + 'px'
}

function withWidth(state) {
  return function(ch, col) {
    return {ch, col, width: getWidth(state.colState, col)}
  }
}

export function createTable(rowCount = 15, state = {}) {
  const colCount = CODE.Z - CODE.A + 1
  const rows = [];

  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(withWidth(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowCount; row += 1) {
    const cells = new Array(colCount)
        .fill('')
        .map(withWidth(state))
        .map(createCell(row, state.dataState))
        .join('')

    rows.push(createRow(cells, row + 1, state.rowState))
  }

  return rows.join('');
}
