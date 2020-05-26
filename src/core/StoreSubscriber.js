import {isEqual} from './utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.prevState = null;
    this.sub = null;
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.changedStore(changes);
            }
          })
        }
      })
      this.prevState = this.store.getState();
    })
  }

  removeSubscribeFromStore() {
    if (this.sub) {
      this.sub.subscribe();
    }
  }
}
