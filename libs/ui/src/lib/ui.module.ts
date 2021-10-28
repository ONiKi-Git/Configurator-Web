import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ColorHueModule } from 'ngx-color/hue';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule} from '@angular/material/expansion'

import { HuePickerComponent } from './components/color-swatches/hue-picker.component';
import { ModelLoaderWithProgressComponent } from './components/loader-with-progress/loader-with-progress.component';

const uiComponents = [
  MatProgressBarModule,
  MatButtonModule,
  ColorHueModule,
  MatSliderModule,
  MatExpansionModule
];

@NgModule({
  imports: [CommonModule, ...uiComponents],
  declarations: [
    ModelLoaderWithProgressComponent,
    HuePickerComponent,
  ],
  exports: [ModelLoaderWithProgressComponent, HuePickerComponent, MatSliderModule, MatExpansionModule],
})
export class UiModule {}
