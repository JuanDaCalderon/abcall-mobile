import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {catchError, take} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/constants';
import {IncidentesService} from 'src/services/incidentes.service';

@Component({
  selector: 'app-crear-incidente-app-mobile',
  templateUrl: './crear-incidente-app-mobile.page.html',
  styleUrls: ['./crear-incidente-app-mobile.page.scss']
})
export class CrearIncidenteAppMobilePage {
  public crearIncidenciaForm: FormGroup = new FormGroup('');
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  constructor(
    private incidentesService: IncidentesService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.crearIncidenciaForm = this.formBuilder.group({
      customer: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
      issueStatus: ['', [Validators.required]]
    });
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
  }

  public async submit() {
    this.isLoading = true;
    this.incidentesService
      .crearIncidente(
        this.crearIncidenciaForm.get('customer')?.value,
        this.crearIncidenciaForm.get('datetime')?.value,
        this.crearIncidenciaForm.get('userName')?.value,
        this.crearIncidenciaForm.get('email')?.value,
        this.crearIncidenciaForm.get('userAddress')?.value,
        this.crearIncidenciaForm.get('phoneNumber')?.value,
        this.crearIncidenciaForm.get('issueDescription')?.value,
        this.crearIncidenciaForm.get('issuePriority')?.value,
        this.crearIncidenciaForm.get('issueStatus')?.value
      )
      .pipe(
        take(1),
        catchError(async (error) => {
          const errorMsg: string = `${this.translateService.instant('abc.toast.incorrect.message')} ${error && error.error?.message ? (error.error?.message as string).toLowerCase() : ''}`;
          const toast = await this.toastController.create({
            message: errorMsg,
            duration: 5000,
            cssClass: 'fs-normal',
            color: 'danger',
            icon: 'alert-circle-outline',
            position: 'bottom',
            swipeGesture: 'vertical'
          });
          toast.present();
          this.isLoading = false;
        })
      )
      .subscribe(async (value) => {
        if (!!value) {
          const toast = await this.toastController.create({
            message: this.translateService.instant('abc.toast.success.message'),
            duration: 5000,
            cssClass: 'fs-normal',
            color: 'primary',
            icon: 'checkmark-done-outline',
            position: 'bottom',
            swipeGesture: 'vertical'
          });
          toast.present();
          this.isLoading = false;
          this.router.navigateByUrl('tabs');
        }
      });
  }
}
