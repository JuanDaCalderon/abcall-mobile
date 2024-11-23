import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private urlApiMessage = `${environment.urlApi}${environment.portChatbot}`;
  constructor(private http: HttpClient) {}

  public sendMessage(descripcion: string): Observable<any> {
    return this.http.post<any>(this.urlApiMessage + '/chatbot?opcion=' + descripcion, {});
  }
}
