import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {catchError, take} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/app/constants';
import {IncidentesService} from 'src/app/services/incidentes.service';
import {Incidente} from 'src/app/models/incidentes.model';
import {AuthService} from 'src/app/services/auth.service';
import {Usuario} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss']
})
export class CrearPage implements OnInit {
  public crearIncidenciaForm: FormGroup = new FormGroup('');
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  public usuarios: Usuario[] = [];
  public clientes: Usuario[] = [];
  public usuario: Usuario;
  constructor(
    private incidentesService: IncidentesService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.crearIncidenciaForm = this.formBuilder.group({
      customer: ['', [Validators.required]],
      userName: [''],
      email: ['', [Validators.required, Validators.email]],
      userAddress: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      issueDescription: ['', [Validators.required]],
      issuePriority: ['', [Validators.required]],
      issueType: ['', [Validators.required]],
      issueComment: []
    });
  }

  ngOnInit() {
    this.initializeTranslations();
    this.loadUsersByRol('4');
  }

  private initializeTranslations() {
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
  }

  public home() {
    this.router.navigate(['/home/consultar_incidentes']);
  }

  public async submit() {
    const incidenteData = {
      cliente: this.crearIncidenciaForm.get('customer')?.value,
      usuario: this.usuario.id,
      gestor: '',
      correo: this.crearIncidenciaForm.get('email')?.value,
      direccion: this.crearIncidenciaForm.get('userAddress')?.value,
      telefono: this.crearIncidenciaForm.get('phoneNumber')?.value,
      descripcion: this.crearIncidenciaForm.get('issueDescription')?.value,
      prioridad: this.crearIncidenciaForm.get('issuePriority')?.value,
      estado: 'abierto',
      tipo: this.crearIncidenciaForm.get('issueType')?.value,
      comentarios: this.crearIncidenciaForm.get('issueComment')?.value,
      id: '',
      canal: 'mobile',
      fechacreacion: ''
    };
    this.isLoading = true;
    this.incidentesService
      .crearIncidente(incidenteData)
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
          this.crearIncidenciaForm.reset();
          this.router.navigate(['/home/consultar_incidentes']);
        },
        async () => {
          this.isLoading = false;
        }
      );
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
            this.crearIncidenciaForm.reset();
            localStorage.removeItem('usuario');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  loadUsersByRol(rol: string): void {
    this.authService
      .getUsers(rol)
      .pipe(take(1))
      .subscribe(async (usuarios) => {
        this.isLoading = false;
        if (rol === '4') this.clientes = usuarios;
        else this.usuarios = usuarios;
        console.log(this.clientes);
      });
  }
}
