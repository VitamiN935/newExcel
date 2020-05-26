import {$} from '../../core/dom';
import {storage} from '../../core/utils';
import {getAllKeysStorage} from './Dashboard.functions';
import {defaultTitle} from '../../constants';

export function createDashboard() {
  return $.create('div', 'dashboard').html(
      `<section class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </section>

        <section class="dashboard__new">
            <div class="dashboard__view">
                <a 
                href="#excel:${Date.now().toString()}" 
                class="dashboard__create">
                    Новая <br> Таблица
                </a>
            </div>
        </section>

        <section class="dashboard__table dashboard__view">
             ${getAllRecords()}
        </section>`
  )
}

function getAllRecords() {
  const keys = getAllKeysStorage();
  return ` <div class="dashboard__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="dashboard__list">
               ${keys.map(createRecord).join('')}
            </ul>`
}


function createRecord(key) {
  const state = storage(key);
  const id = key.split(':')[1]
  return ` <li class="dashboard__record">
                <a href="#excel:${id}">${state.title || defaultTitle}</a>
                <strong>${state.date}</strong>
           </li>`
}
