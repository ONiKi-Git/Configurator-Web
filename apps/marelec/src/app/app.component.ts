import { Component } from '@angular/core';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tiles = [1, 2, 3, 4, 6, 6, 6, 6];

  title = 'marelec';
}
