import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  public login(email: string, password: string): Observable<string> {
    return of(email + '----' + password).pipe(delay(2000));
  }
}
