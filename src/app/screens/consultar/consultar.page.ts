import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs';
import {DEFAULT_LANG} from 'src/app/constants';
import {Incidente} from 'src/app/models/incidentes.model';
import {IncidentesService} from 'src/app/services/incidentes.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss']
})
export class ConsultarPage {
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  public incidencias: Incidente[] = [];

  constructor(
    private consultarService: IncidentesService,
    private translateService: TranslateService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
    this.consultarService.getIncidencias().subscribe((data: Incidente[]) => {
      this.incidencias = data;
    });
  }

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('abc.crearIncidenciaAppMobile.logout'),
      message: this.translateService.instant('abc.crearIncidenciaAppMobile.logout.message'),
      buttons: [
        {
          text: this.translateService.instant('abc.crearIncidenciaAppMobile.logout.no'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: this.translateService.instant('abc.crearIncidenciaAppMobile.logout.yes'),
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
