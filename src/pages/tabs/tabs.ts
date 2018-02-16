import { Component } from '@angular/core';
import { TasksPage } from '../tasks';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TasksPage;

  constructor() {

  }
}
