import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  /** API url */
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  public crearIncidente(
    customer: string,
    datetime: string,
    userName: string,
    email: string,
    userAddress: string,
    phoneNumber: string,
    issueDescription: string,
    issuePriority: string,
    issueStatus: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/incidentes`, {
      customer,
      datetime,
      userName,
      email,
      userAddress,
      phoneNumber,
      issueDescription,
      issuePriority,
      issueStatus
    });
  }
}
