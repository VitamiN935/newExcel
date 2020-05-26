import {Page} from '../core/Page';
import {Excel} from '../components/Excel/Excel';
import {Header} from '../components/Header/Header';
import {Toolbar} from '../components/Toolbar/Toolbar';
import {Formula} from '../components/Formula/Formula';
import {Table} from '../components/Table/Table';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../core/store/rootReducer';
import {storage, storageName} from '../core/utils';
import {getInitialState} from '../core/store/initialState';

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client;
  }

  listen(state) {
    // this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}

export class LocaleStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
  }

  get() {
    return getInitialState(this.name);
  }
}

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
    this.processor = new StateProcessor(
        new LocaleStorageClient(this.params)
    )
  }
  getRoot() {
    const initialState = this.processor.get();
    const store = createStore(rootReducer, initialState)
    console.log(store.getState())
    store.dispatch(this.processor.listen);

    const excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return excel.getRoot()
  }
}
