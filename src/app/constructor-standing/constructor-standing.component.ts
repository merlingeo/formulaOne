import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormulaOneService } from '../formula-one.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-constructor-standing',
  standalone: true,
  animations: [
    trigger('detailExpand', [
        state('collapsed,void', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
],
  imports: [CommonModule, MatTableModule, MatIconModule,MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './constructor-standing.component.html',
  styleUrl: './constructor-standing.component.scss'
})
export class ConstructorStandingComponent implements OnInit {

  dataSource: ConstElement[]=[];
  columnsToDisplay = ['Position', 'Name', 'Nationality', 'Wins', 'Points'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ConstElement | null | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ELEMENT_DATA_1: ConstElement[] = [];

  isLoading = true;
  race_results: any;
  @Output() loadingEvent = new EventEmitter<any>();
  @Input() CrcuitIdInfo: any;
  driver_results: any;
  finalDriverString: string='';

  
  constructor(private formulaOneService: FormulaOneService,
    private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const lyear = params['year'];
      const lround = params['round'];

      // this.controlSpinner(true);
      this.isLoading = true;
      this.getConstructorSelectedRound(lyear, lround);
    });

  }



  getConstructorSelectedRound(selectyear: any, round: number) {
    this.formulaOneService.getallConstructorRound(selectyear, round).pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.race_results = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;


        this.race_results.forEach((ele: any) => {

          this.ELEMENT_DATA_1.push({
            Position: ele.position,
            Points: ele.points,
            Wins: ele.wins,
            Name: ele.Constructor.name,
            Nationality: ele.Constructor.nationality,
            ConstructorId: ele.Constructor.constructorId,
            Description :''

          });

        });

        // console.log(this.ELEMENT_DATA_1);

        this.dataSource = this.ELEMENT_DATA_1;


        // this.controlSpinner(false);
        this.isLoading = false;
      })


  }

  controlSpinner(data: any){    
    this.loadingEvent.emit(data);
  }

  fetchallDrivers(dataItem: any){
    this.finalDriverString='';
    
    this.formulaOneService.getallConstructorDriversInRound(dataItem.ConstructorId,this.CrcuitIdInfo.circuitId).pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      // console.log(data);
      this.driver_results = data.MRData.DriverTable.Drivers;
      let driverstring='';
      this.driver_results.forEach((element: { givenName: string; familyName: string; },index: number) => {
        if (index!=this.driver_results.length-1){

          driverstring+=element.givenName+', '+element.familyName+', ';
        }else{
          driverstring+=element.givenName+', '+element.familyName+'.';
        }
        
      });
      this.finalDriverString =driverstring;
      // let constItem = this.dataSource.find(ele => dataItem.ConstructorId === ele.ConstructorId)
      // console.log(constItem,driverstring);
      
      // constItem.Description=driverstring;


    })
    
  }

}

export interface ConstElement {
  Position: number;
  Wins: string;
  Points: number;
  Nationality: string;
  ConstructorId: string;
  Name: string;
  Description:string;

}


