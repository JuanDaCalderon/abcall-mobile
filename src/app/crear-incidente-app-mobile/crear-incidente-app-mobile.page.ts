import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/constants';
import {AuthService} from 'src/services';

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
    private authService: AuthService,
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
}
