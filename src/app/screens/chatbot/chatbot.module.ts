import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatbotPage} from './chatbot.page';
import {ChatbotPageRoutingModule} from './chatbot-routing.module';
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ChatbotPageRoutingModule],
  declarations: [ChatbotPage]
})
export class ChatbotPageModule {}
