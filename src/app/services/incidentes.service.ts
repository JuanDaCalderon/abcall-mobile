import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Incidente, IncidenteRequest} from '../models/incidentes.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private urlApi = `${environment.urlApi}${environment.portCrearIncidentes}`;
  private urlApiConsultar = `${environment.urlApi}${environment.portConsulIncidencias}`;
  constructor(private http: HttpClient) {}

  public crearIncidente(incidente: IncidenteRequest): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/incidentes`, incidente);
  }

  public getIncidencias(): Observable<Incidente[]> {
    return this.http.get<Incidente[]>(`${this.urlApiConsultar}/incidentes`);
  }
}
