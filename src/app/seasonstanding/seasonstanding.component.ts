import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaOneService } from '../formula-one.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-seasonstanding',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './seasonstanding.component.html',
  styleUrl: './seasonstanding.component.scss'
})
export class SeasonstandingComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  season_drivers: any=[];
  season_const: any=[];
  season: any='';
  isLoading:boolean=true;
  constructor(private formulaOneService: FormulaOneService,
    private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    // console.log('seasoncomponet');

    this.route.queryParams.subscribe(params => {
      const lyear = params['year'];
      this.season =lyear;
      this.isLoading= true;
      this.getDriverStandingSelectedRound(lyear);
      this.getConstStandingSelectedRound(lyear);
    });
  }

  tableData = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Doe', age: 40 }
  ];

  getDriverStandingSelectedRound(selectyear: any) {
    this.formulaOneService.getallDriversInSeason(selectyear).pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((ele:any) =>{

          this.season_drivers.push({position:ele.position,name :ele.Driver.givenName+' '+ele.Driver.familyName,
          wins:ele.wins,points:ele.points,constructor:ele.Constructors[0].name})
          
          this.isLoading= false;
        })
      });
  }

  getConstStandingSelectedRound(selectyear: any) {
    this.formulaOneService.getallConstructorsInSeason(selectyear).pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        // this.season_const = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map((ele:any) =>{

          this.season_const.push({position:ele.position,name :ele.Constructor.name,
          wins:ele.wins,points:ele.points,nationality:ele.Constructor.nationality})
          
        })
      });
  }

  ngOnDestroy() {
   
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


