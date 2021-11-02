import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ColorHueModule } from 'ngx-color/hue';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { HuePickerComponent } from './components/color-swatches/hue-picker.component';
import { ModelLoaderWithProgressComponent } from './components/loader-with-progress/loader-with-progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const uiComponents = [
  MatProgressBarModule,
  MatButtonModule,
  ColorHueModule,
  MatSliderModule,
  MatExpansionModule,
  MatGridListModule,
  FlexLayoutModule,
];

@NgModule({
  imports: [CommonModule, ...uiComponents],
  declarations: [ModelLoaderWithProgressComponent, HuePickerComponent],
  exports: [
    ModelLoaderWithProgressComponent,
    HuePickerComponent,
    MatSliderModule,
    MatExpansionModule,
    MatGridListModule,
    FlexLayoutModule,
    MatButtonModule
  ],
})
export class UiModule {}
