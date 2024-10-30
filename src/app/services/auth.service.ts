import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {loginUser} from 'src/app/screens/login/models';
import {Usuario} from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** API url */
  private urlApi = `${environment.urlApi}${environment.portUsuario}`;
  constructor(private http: HttpClient) {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  public login(email: string, password: string): Observable<loginUser> {
    return this.http.post<loginUser>(`${this.urlApi}/usuario/login`, {email, password});
  }

  public getUsers(rol: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlApi + '/usuarios/' + rol);
  }
}
