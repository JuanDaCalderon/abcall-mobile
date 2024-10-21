import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LANG, LANGS} from 'src/app/constants';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: ''
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(DEFAULT_LANG);
    this.translateService.addLangs([...LANGS]);
  }
}
