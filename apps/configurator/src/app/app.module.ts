import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RendererModule } from '@torbenvanassche/threejswrapper';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RendererModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
