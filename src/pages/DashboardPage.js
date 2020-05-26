import {Page} from '../core/Page';
import {createDashboard} from '../components/Dashboard/Dashboard.template';

export class DashboardPage extends Page {
  getRoot() {
    return createDashboard();
  }
}
