import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private apiUrl = environment.apiUrlCrearIncidente;
  constructor(private http: HttpClient) {}

  public crearIncidente(
    customer: string,
    datetime: string,
    userName: string,
    email: string,
    userAddress: string,
    phoneNumber: string,
    issueDescription: string,
    issuePriority: string,
    issueStatus: string,
    issueComment: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/incidentes`, {
      cliente: customer,
      fechacreacion: datetime,
      usuario: userName,
      correo: email,
      direccion: userAddress,
      telefono: phoneNumber,
      descripcion: issueDescription,
      prioridad: issuePriority,
      estado: issueStatus,
      comentarios: issueComment
    });
  }
}
