import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs';
import {DEFAULT_LANG} from 'src/constants';

@Component({
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public hasLoadTranslations: boolean = false;
  constructor(private translateService: TranslateService) {
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
  }
}
