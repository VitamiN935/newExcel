import {Page} from '@core/Page';
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@core/store/rootReducer';
import {debounse, storage, storageName} from '@core/utils';
import {getInitialState} from '@core/store/initialState';
import {updateDate} from '@core/store/actions';

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client;
    this.listen = debounse(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.save(state);
    console.log(state);
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
    store.subscribe(this.processor.listen);
    store.dispatch(updateDate(new Date().toLocaleString()))
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    if (this.excel) this.excel.init()
  }

  destroy() {
    if (this.excel) this.excel.destroy()
  }
}
