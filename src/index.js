import './scss/index.scss'
import {Router} from './core/router/Router';
import {DashboardPage} from './pages/DashboardPage';
import {ExcelPage} from './pages/ExcelPage';


new Router(
    '#app',
    {
      main: DashboardPage,
      excel: ExcelPage,
    }
)
