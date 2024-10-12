import {Component} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LangsImgs} from './models';
import {DEFAULT_LANG, LANGS} from 'src/constants';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [IonicModule, TranslateModule, CommonModule],
  selector: 'app-internationalization',
  templateUrl: './internationalization.component.html',
  styleUrls: ['./internationalization.component.scss']
})
export class InternationalizationComponent {
  /** Array Langs  */
  public langs: string[] = [];
  /** Default language  */
  public defaultLang: string = DEFAULT_LANG;
  /** Language images path object  */
  public langImgPath: LangsImgs[] = [
    {
      lang: LANGS[0],
      imgPath: `assets/img/${LANGS[1]}.jpg`
    },
    {
      lang: LANGS[1],
      imgPath: `assets/img/${LANGS[0]}.jpg`
    }
  ];
  /** Image path to be shown  */
  public imgPath: string | undefined = this.langImgPath.find((lang) => lang.lang === this.defaultLang)?.imgPath;

  constructor(private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
    this.defaultLang = this.translateService.getDefaultLang();
  }

  /**
   * Change Language trigger
   * @param {Event} $event the tap or mouse event
   * @returns {void}
   */
  public changeLang($event: Event): void {
    const currentLang: string = ($event.target as Element).getAttribute('data-lang-value') ?? DEFAULT_LANG;
    const newLang: string = this.langs.find((lang) => currentLang !== lang) ?? DEFAULT_LANG;
    this.defaultLang = newLang;
    this.imgPath = this.langImgPath.find((lang) => lang.lang === newLang)?.imgPath;
    this.translateService.use(newLang);
  }
}
