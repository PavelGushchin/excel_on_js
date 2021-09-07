import {Excel} from './core/Excel';
import {Header} from './components/HeaderComponent/Header';
import {Toolbar} from './components/ToolbarComponent/Toolbar';
import {Formula} from './components/FormulaComponent/Formula';
import {Table} from './components/TableComponent/Table';
import './scss/index.scss';

const excel = new Excel({
  components: [
    new Header,
    new Toolbar,
    new Formula,
    new Table,
  ],
});

excel.render('#app');
