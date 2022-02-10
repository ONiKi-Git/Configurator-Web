import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vawat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Input() pageName: string = "Welkom";

  constructor() { }

  ngOnInit(): void {
  }

}
