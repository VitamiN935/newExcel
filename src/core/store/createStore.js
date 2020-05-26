import {clone} from '../utils';

export function createStore(rootReducer, initialState) {
  if (!initialState) {
    throw new Error('initial State not defined in Store!')
  }

  let state = rootReducer(initialState, {type: '__INIT__'})
  let listeners = []

  return {
    getState: () => clone(state),

    subscribe: callback => {
      listeners.push(callback);
      return {
        unsubscribe: () => listeners = listeners.filter(l => l !== callback)
      }
    },

    dispatch: action => {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state))
    }
  }
}
