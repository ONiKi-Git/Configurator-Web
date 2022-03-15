import { Component } from '@angular/core';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'configurator2d';

  img: string = "assets/BULBBOT_A-BASIC-LONG.jpg";

  lampType: string = "A";
  upperType: string = "BASIC";
  lowerType: string = "LONG";

  updateValue() {
    this.img = `assets/BULBBOT_${this.lampType}-${this.upperType}-${this.lowerType}.jpg`;
  }

  setLamp(s: string) {
    this.lampType = s;
    this.updateValue();
  }

  setUpper(s: string) {
    this.upperType = s;
    this.updateValue();
  }

  setLower(s: string) {
    this.lowerType = s;
    this.updateValue();
  }
}
