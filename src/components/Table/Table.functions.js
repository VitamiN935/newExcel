import {$} from '@core/dom';
import {range} from '@core/utils';

const keys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Enter',
  'Tab'
];

export function toNextCell(event) {
  return keys.includes(event.key) && !event.shiftKey
}


export function isResize(event) {
  return $(event.target).data.resize
}


export function matrix($target, $current) {
  const current = $current.id(true);
  const target = $target.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)
  return rows.reduce((acc, row) =>{
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc;
  }, [])
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col++
      break;
    case 'ArrowDown':
    case 'Enter':
      row++
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
      break
  }
  return `[data-id="${row}:${col}"]`
}


