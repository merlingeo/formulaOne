import { Component, Input } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-constructor-standing',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule,MatButtonModule,],
  templateUrl: './constructor-standing.component.html',
  styleUrl: './constructor-standing.component.scss'
})
export class ConstructorStandingComponent {

  dataSource!: RaceElement[];
  columnsToDisplay = ['Position', 'Rank', 'Points', 'Driver','Constructor','Time'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: RaceElement | null | undefined;
  

ngOnInIt(){
  
}






}

export interface RaceElement {
  Position :number,
  Rank :string,
  Points :number,
  Driver :string,
  Constructor: string,
  Time : string
}


