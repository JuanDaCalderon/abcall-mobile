import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpErrorInterceptorService} from './HttpErrorInterceptorService.service';
import {ToastController} from '@ionic/angular';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpErrorResponse, HttpHandler, HttpRequest, provideHttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';

describe('Service: HttpErrorInterceptorService', () => {
  let interceptor: HttpErrorInterceptorService;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;
  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptorService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: ToastController, useValue: toastSpy}
      ]
    });
    interceptor = TestBed.inject(HttpErrorInterceptorService);
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
  });

  it('should be defined', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show a toast and rethrow the error when a HttpErrorResponse occurs', fakeAsync(() => {
    const toastMock = {
      present: jasmine.createSpy('present')
    };
    toastControllerSpy.create.and.returnValue(Promise.resolve(toastMock as unknown as HTMLIonToastElement));
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: {message: 'Error de prueba', statusCode: 500},
              status: 500,
              statusText: 'Internal Server Error'
            })
        )
      )
    };
    interceptor.intercept(request, next).subscribe({
      error: (err) => {
        expect(err.message).toBe('Error de prueba');
        expect(toastControllerSpy.create).toHaveBeenCalledWith({
          message: 'Error de prueba',
          duration: 5000,
          cssClass: 'fs-normal',
          color: 'danger',
          icon: 'alert-circle-outline',
          position: 'bottom',
          swipeGesture: 'vertical'
        });
        tick();
        expect(toastMock.present).toHaveBeenCalled();
      }
    });
  }));

  it('should show a toast and rethrow the error when a HttpErrorResponse server error occurs', fakeAsync(() => {
    const toastMock = {
      present: jasmine.createSpy('present')
    };
    toastControllerSpy.create.and.returnValue(Promise.resolve(toastMock as unknown as HTMLIonToastElement));
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: {},
              status: 500,
              statusText: 'Internal Server Error'
            })
        )
      )
    };
    interceptor.intercept(request, next).subscribe({
      error: (err) => {
        expect(err.message).toBe('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
        expect(toastControllerSpy.create).toHaveBeenCalledWith({
          message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.',
          duration: 5000,
          cssClass: 'fs-normal',
          color: 'danger',
          icon: 'alert-circle-outline',
          position: 'bottom',
          swipeGesture: 'vertical'
        });
        tick();
        expect(toastMock.present).toHaveBeenCalled();
      }
    });
  }));
});
