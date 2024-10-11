import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LANG, LANGS} from 'src/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(DEFAULT_LANG);
    this.translateService.addLangs([...LANGS]);
  }
}
