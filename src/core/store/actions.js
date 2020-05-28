import * as types from './types';

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data
  }
}

export function updateDate(data) {
  return {
    type: types.UPDATE_DATE,
    data
  }
}

export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data
  }
}
