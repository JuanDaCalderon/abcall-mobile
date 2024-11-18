import {Component, OnInit} from '@angular/core';
import {ChatbotService} from '../../services/chatbot.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: 'chatbot.page.html',
  styleUrls: ['chatbot.page.scss']
})
export class ChatbotPage implements OnInit {
  public hasLoadTranslations: boolean = false;
  public isLoading: boolean = false;
  messages: {text: string; sender: 'user' | 'bot'}[] = [];
  newMessage: string = '';

  constructor(
    private chatbotService: ChatbotService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chatbotService.sendMessage('0').subscribe((response) => {
      const botMessage: {text: string; sender: 'user' | 'bot'} = {text: response.respuesta, sender: 'bot'};
      this.messages.push(botMessage);
    });
  }

  sendMessage() {
    if (this.newMessage.trim().length === 0) {
      return;
    }

    const userMessage: {text: string; sender: 'user' | 'bot'} = {text: this.newMessage, sender: 'user'};
    this.messages.push(userMessage);

    this.chatbotService.sendMessage(this.newMessage).subscribe((response) => {
      const botMessage: {text: string; sender: 'user' | 'bot'} = {text: response.respuesta, sender: 'bot'};
      this.messages.push(botMessage);
    });

    this.newMessage = '';
  }

  public home() {
    this.router.navigate(['/home/consultar_incidentes']);
  }
}
