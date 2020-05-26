import {clone, storage} from '../utils';

const initialState = {
  colState: {},
  rowState: {}
}

export function getInitialState(storeName) {
  return storage(storeName) || clone(initialState);
}
