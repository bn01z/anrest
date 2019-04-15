import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AnRestApiModule } from '@anrest/api';
import { AnRestLoaderModule } from '@anrest/loader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnRestApiModule.config({
      uri: 'https://jsonplaceholder.typicode.com'
    }),
    AnRestLoaderModule.config()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
