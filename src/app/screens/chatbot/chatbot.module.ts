import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatbotPage} from './chatbot.page';
import {ChatbotPageRoutingModule} from './chatbot-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {FooterComponent, InternationalizationComponent} from 'src/app/components';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatbotPageRoutingModule,
    TranslateModule,
    FooterComponent,
    InternationalizationComponent
  ],
  declarations: [ChatbotPage]
})
export class ChatbotPageModule {}
