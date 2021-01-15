import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/fipe-cars.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() selectedCar: Car;
 
  constructor() { }

  ngOnInit(): void {
  }

}
