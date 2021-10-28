import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RendererModule } from '@torbenvanassche/threejswrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UiModule } from '@oniki/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RendererModule, BrowserAnimationsModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
