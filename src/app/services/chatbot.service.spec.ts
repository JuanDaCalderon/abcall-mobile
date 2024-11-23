import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChatbotService} from './chatbot.service';
import {environment} from '../../environments/environment';

describe('ChatbotService', () => {
  let service: ChatbotService;
  let httpMock: HttpTestingController;
  const urlApiMessage = `${environment.urlApi}${environment.portChatbot}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatbotService]
    });
    service = TestBed.inject(ChatbotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message and return a response', () => {
    const mockResponse = {message: 'Hello, this is a response from the bot.'};
    const descripcion = 'test message';

    service.sendMessage(descripcion).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${urlApiMessage}/chatbot?opcion=${descripcion}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
