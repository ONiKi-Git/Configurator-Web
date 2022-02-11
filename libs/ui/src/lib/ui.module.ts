import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ColorChromeModule } from 'ngx-color/chrome';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { HuePickerComponent } from './components/color-swatches/hue-picker.component';
import { ModelLoaderWithProgressComponent } from './components/loader-with-progress/loader-with-progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const uiComponents = [
  MatProgressBarModule,
  MatButtonModule,
  ColorChromeModule,
  MatSliderModule,
  MatExpansionModule,
  MatGridListModule,
  FlexLayoutModule,
  MatSidenavModule,
  MatSelectModule ,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [CommonModule, ...uiComponents],
  declarations: [ModelLoaderWithProgressComponent, HuePickerComponent],
  exports: [
    ModelLoaderWithProgressComponent,
    HuePickerComponent,
    ...uiComponents
  ],
})
export class UiModule {}
