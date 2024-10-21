import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {catchError, take} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/app/constants';
import {IncidentesService} from 'src/app/services/incidentes.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss']
})
export class CrearPage implements OnInit {
  public crearIncidenciaForm: FormGroup = new FormGroup('');
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  constructor(
    private incidentesService: IncidentesService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.crearIncidenciaForm = this.formBuilder.group({
      customer: ['', [Validators.required]],
      datetime: [new Date().toISOString(), [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
      issueStatus: ['', [Validators.required]],
      issueComment: []
    });
  }

  ngOnInit() {
    this.initializeTranslations();
  }

  private initializeTranslations() {
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public async submit() {
    const datetimeValue = this.crearIncidenciaForm.get('datetime')?.value;
    if (datetimeValue) {
      const dateObject = new Date(datetimeValue);
      if (!isNaN(dateObject.getTime())) {
        const formattedDatetime = this.formatDate(dateObject);

        const incidenteData = {
          cliente: this.crearIncidenciaForm.get('customer')?.value,
          fechacreacion: formattedDatetime,
          usuario: this.crearIncidenciaForm.get('userName')?.value,
          correo: this.crearIncidenciaForm.get('email')?.value,
          direccion: this.crearIncidenciaForm.get('userAddress')?.value,
          telefono: this.crearIncidenciaForm.get('phoneNumber')?.value,
          descripcion: this.crearIncidenciaForm.get('issueDescription')?.value,
          prioridad: this.crearIncidenciaForm.get('issuePriority')?.value,
          estado: this.crearIncidenciaForm.get('issueStatus')?.value,
          comentarios: this.crearIncidenciaForm.get('issueComment')?.value
        };
        this.isLoading = true;
        this.incidentesService
          .crearIncidente(
            incidenteData.cliente,
            incidenteData.fechacreacion,
            incidenteData.usuario,
            incidenteData.correo,
            incidenteData.direccion,
            incidenteData.telefono,
            incidenteData.descripcion,
            incidenteData.prioridad,
            incidenteData.estado,
            incidenteData.comentarios
          )
          .pipe(
            take(1),
            catchError(async (error) => {
              const errorMsg: string = `${this.translateService.instant('abc.crearIncidenciaAppMobile.incorrect.message')} ${error && error.error?.message ? (error.error?.message as string).toLowerCase() : ''}`;
              const toast = await this.toastController.create({
                message: errorMsg,
                duration: 5000,
                cssClass: 'fs-normal',
                color: 'danger',
                icon: 'alert-circle-outline',
                position: 'bottom',
                swipeGesture: 'vertical'
              });
              await toast.present();
              throw error;
            })
          )
          .subscribe(
            async () => {
              this.isLoading = false;
              const toast = await this.toastController.create({
                message: this.translateService.instant('abc.crearIncidenciaAppMobile.success.message'),
                duration: 2000,
                cssClass: 'fs-normal',
                color: 'success',
                icon: 'checkmark-circle-outline',
                position: 'bottom',
                swipeGesture: 'vertical'
              });
              await toast.present();
              this.router.navigate(['/home/consultar_incidentes']);
            },
            async () => {
              this.isLoading = false;
            }
          );
      }
    }
  }

  async confirmarCrearIncidente() {
    if (this.crearIncidenciaForm.invalid) {
      const toast = await this.toastController.create({
        message: this.translateService.instant('abc.crearIncidenciaAppMobile.incorrect.message'),
        duration: 5000,
        cssClass: 'fs-normal',
        color: 'danger',
        icon: 'alert-circle-outline',
        position: 'bottom',
        swipeGesture: 'vertical'
      });
      await toast.present();
      return;
    }

    const alert = await this.alertController.create({
      header: this.translateService.instant('abc.crearIncidenciaAppMobile.createIssueButton'),
      message: this.translateService.instant('abc.crearIncidenciaAppMobile.createIssueButton.message'),
      buttons: [
        {
          text: this.translateService.instant('abc.crearIncidenciaAppMobile.createIssueButton.no'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: this.translateService.instant('abc.crearIncidenciaAppMobile.createIssueButton.yes'),
          handler: () => {
            this.submit();
          }
        }
      ]
    });

    await alert.present();
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
