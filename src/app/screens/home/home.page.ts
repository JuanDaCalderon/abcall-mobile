import {Component} from '@angular/core';
import {PATHS} from 'src/app/constants';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public PATHS = PATHS;
  constructor() {}
}
