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
