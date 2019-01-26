import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AnRestApiModule } from '@anrest/api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnRestApiModule.config({
      uri: 'https://jsonplaceholder.typicode.com'
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
