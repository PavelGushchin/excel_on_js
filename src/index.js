import {Excel} from './core/Excel';
import {Header} from './components/HeaderComponent/Header';
import {Toolbar} from './components/ToolbarComponent/Toolbar';
import {Formula} from './components/FormulaComponent/Formula';
import {Table} from './components/TableComponent/Table';
import {createStore} from './core/createStore';
import {rootReducer} from './core/redux/rootReducer';
import {initialState} from './core/redux/initialState';
import './scss/index.scss';

const store = createStore(rootReducer, initialState);

const excel = new Excel({
  components: [
    new Header,
    new Toolbar,
    new Formula,
    new Table,
  ],
  store: store,
});

excel.render('#app');
