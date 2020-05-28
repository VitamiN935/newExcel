import {clone, storage} from '../utils';

const initialState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  title: '',
  date: new Date().toLocaleString()
}

export function getInitialState(storeName) {
  return storage(storeName) ||
    {...clone(initialState), date: new Date().toLocaleString()}
  ;
}
