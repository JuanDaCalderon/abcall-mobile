import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {take, from, Observable, forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {DEFAULT_LANG} from 'src/app/constants';
import {AuthService} from 'src/app/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  public loginForm: FormGroup = new FormGroup('');
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  public toastSuccess$: Observable<HTMLIonToastElement> = from(
    this.toastController.create({
      duration: 5000,
      cssClass: 'fs-normal',
      color: 'primary',
      icon: 'checkmark-done-outline',
      position: 'bottom',
      swipeGesture: 'vertical'
    })
  );
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.translateService
      .getTranslation(DEFAULT_LANG)
      .pipe(take(1))
      .subscribe((lang) => {
        this.hasLoadTranslations = !!lang;
      });
  }
  public submit() {
    this.isLoading = true;
    forkJoin([this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value), this.toastSuccess$])
      .pipe(take(1))
      .subscribe(([loginUser, toast]) => {
        if (!!loginUser && !!loginUser.token) {
          toast.message = this.translateService.instant('abc.toast.success.message');
          toast.present();
          this.router.navigateByUrl('home');
        }
      })
      .add(() => (this.isLoading = false));
  }
}
