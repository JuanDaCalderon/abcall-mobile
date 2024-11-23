import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ChatbotPage} from './chatbot.page';
import {ChatbotService} from '../../services/chatbot.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';

describe('ChatbotPage', () => {
  let component: ChatbotPage;
  let fixture: ComponentFixture<ChatbotPage>;
  let chatbotService: ChatbotService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbotPage],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ChatbotService]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotPage);
    component = fixture.componentInstance;
    chatbotService = TestBed.inject(ChatbotService);
    router = TestBed.inject(Router);

    spyOn(chatbotService, 'sendMessage').and.callFake((message: string) => {
      if (message === '0') {
        return of({respuesta: 'Hola, ¿en qué puedo ayudarte?'});
      } else {
        return of({respuesta: 'Respuesta del bot'});
      }
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial bot message on init', () => {
    expect(chatbotService.sendMessage).toHaveBeenCalledWith('0');
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].text).toBe('Hola, ¿en qué puedo ayudarte?');
    expect(component.messages[0].sender).toBe('bot');
  });

  it('should send a user message and receive a bot response', () => {
    component.newMessage = 'Hola';
    component.sendMessage();

    expect(component.messages.length).toBe(3);
    expect(component.messages[1].text).toBe('Hola');
    expect(component.messages[1].sender).toBe('user');
    expect(component.messages[2].text).toBe('Respuesta del bot');
    expect(component.messages[2].sender).toBe('bot');
  });

  it('should not send an empty message', () => {
    component.newMessage = '';
    component.sendMessage();

    expect(component.messages.length).toBe(1);
  });

  it('should navigate to home on home button click', () => {
    spyOn(router, 'navigate');
    component.home();
    expect(router.navigate).toHaveBeenCalledWith(['/home/consultar_incidentes']);
  });
});
