import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {catchError, take} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/constants';
import {AuthService} from 'src/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  public loginForm: FormGroup = new FormGroup('');
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
    this.authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
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
