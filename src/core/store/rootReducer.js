import * as types from './types';

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case types.CHANGE_TITLE:
      return {...state, title: action.data}
    case types.UPDATE_DATE:
      return {...state, date: new Date().toLocaleString()}
    case types.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: getUpdateField(state, action, field)}
    case types.CHANGE_TEXT:
      field = 'dataState';
      console.log(action)
      return {
        ...state,
        currentText: action.data.value,
        [field]: getUpdateField(state, action, field)
      }
    default:
      return state;
  }
}

function getUpdateField(state, action, field) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value
  console.log(prevState);
  return prevState
}
