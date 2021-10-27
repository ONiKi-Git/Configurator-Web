import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RendererModule } from '@torbenvanassche/threejswrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ColorHueModule } from 'ngx-color/hue';
import { MatSliderModule } from '@angular/material/slider';

import { ModelLoaderWithProgressComponent } from './model-loader-with-progress/model-loader-with-progress.component';
import { ColorSwatchesComponent } from './color-swatches/color-swatches.component';

const uiComponents = [MatProgressBarModule, MatButtonModule, ColorHueModule, MatSliderModule];

@NgModule({
  declarations: [
    AppComponent,
    ModelLoaderWithProgressComponent,
    ColorSwatchesComponent,
  ],
  imports: [
    BrowserModule,
    RendererModule,
    BrowserAnimationsModule,
    ...uiComponents,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
