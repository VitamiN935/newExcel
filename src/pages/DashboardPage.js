import {Page} from '../core/Page';
import {$} from '../core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(
        `<section class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </section>

        <section class="dashboard__new">
            <div class="dashboard__view">
                <a href="#" class="dashboard__create">
                    Новая <br> Таблица
                </a>
            </div>
        </section>

        <section class="dashboard__table dashboard__view">

            <div class="dashboard__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="dashboard__list">

                <li class="dashboard__record">
                    <a href="#">Таблица номер 1 </a>
                    <strong>12.06.2012</strong>
                </li>

                <li class="dashboard__record">
                    <a href="#">Таблица номер 2 </a>
                    <strong>14.06.2012</strong>
                </li>

            </ul>

        </section>`
    )
  }
}
