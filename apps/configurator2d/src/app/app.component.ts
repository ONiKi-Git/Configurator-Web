import { Component } from '@angular/core';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'configurator2d';

  img: string = "assets/2700K_Double_A_Black.png";

  temperature: string = "2700K";
  color: string = "Black";
  type: string = "A";
  amount: string = "Double"

  updateValue() {
    console.log(this.img)
    this.img = `assets/${this.temperature}_${this.amount}_${this.type}_${this.color}.png`;
  }

  setTemperature(s: string) {
    this.temperature = s;
    this.updateValue();
  }

  setColor(s: string) {
    this.color = s;
    this.updateValue();
  }

  setType(s: string) {
    this.type = s;
    this.updateValue();
  }

  setAmount(s: string) {
    this.amount = s;
    this.updateValue();
  }
}
