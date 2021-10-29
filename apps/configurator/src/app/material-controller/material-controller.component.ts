import { Component, OnInit, Input } from '@angular/core';
import { MeshPhysicalMaterial } from 'three';

@Component({
  selector: 'oniki-material-controller',
  templateUrl: './material-controller.component.html',
  styleUrls: ['./material-controller.component.scss']
})
export class MaterialControllerComponent implements OnInit {
  @Input() material: MeshPhysicalMaterial;

  constructor() { }

  ngOnInit(): void {
  }

}
