import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {catchError, from, Observable, take, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private toastController: ToastController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('🚀 ~ HttpErrorInterceptorService ~ catchError ~ error:', error);
        const isCustomError: boolean = !!error.error.message && !!error.error.statusCode;
        let errorMessage: string = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.';
        if (isCustomError) errorMessage = error.error?.message;
        from(
          this.toastController.create({
            message: errorMessage,
            duration: 5000,
            cssClass: 'fs-normal',
            color: 'danger',
            icon: 'alert-circle-outline',
            position: 'bottom',
            swipeGesture: 'vertical'
          })
        )
          .pipe(take(1))
          .subscribe((toast) => toast.present());
        console.error('CUSTOM ERROR:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
