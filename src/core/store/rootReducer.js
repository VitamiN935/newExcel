import * as types from './types';

export function rootReducer(state, action) {
  // let field;
  switch (action.type) {
    case types.CHANGE_TITLE:
      return {...state, title: action.data}
    case types.UPDATE_DATE:
      return {...state, date: new Date().toLocaleString()}
    default: return state;
  }
}
