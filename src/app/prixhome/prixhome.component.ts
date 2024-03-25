import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulaOneService } from '../formula-one.service';
import { Subject, takeUntil } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LinegraphComponent } from "../linegraph/linegraph.component";
import { GoogleMapComponent } from "../google-map/google-map.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConstructorStandingComponent } from "../constructor-standing/constructor-standing.component";

@Component({
    selector: 'app-prixhome',
    standalone: true,
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    templateUrl: './prixhome.component.html',
    styleUrl: './prixhome.component.scss',
    imports: [CommonModule, MatTooltipModule, MatSidenavModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, LinegraphComponent, GoogleMapComponent, ConstructorStandingComponent]
})
export class PrixhomeComponent {
  
  driverDropDownArray:any[]=[];
  constructor(private formulaOneService: FormulaOneService,
              private route: ActivatedRoute,private router: Router) { }

  // isNavBtnSelected = false;
  isLoading=true;
  results: any;
  race_results: any;
  dataSource!: RaceElement[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  ELEMENT_DATA_1 : RaceElement[] =[];

  columnsToDisplay = ['Position', 'Rank', 'Points', 'Driver','Constructor','Time'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: RaceElement | null | undefined;
  
  selectedSidenav:any;
  sideNavToDisplay =[{icon :'sports_motorsports',tooltip :'Driver Standing'},
                     {icon :'emoji_transportation',tooltip :'Constructor Standing'},
                     {icon :'sports_score',tooltip :'Qualifier Results'},
                     {icon :'mode_of_travel',tooltip :'Sprint Results'},
                     {icon :'emoji_events',tooltip :'Season Results'}]

  ngOnInit(): void {
    this.changeSideNavColor(this.sideNavToDisplay[0]);

    this.route.queryParams.subscribe(params => {
      const lyear = params['year'];
      const lround = params['round'];
      // this.isLoading=false;
      this.getSelectedRoundDetails(lyear,lround);

    });
  }

  ngOnDestroy() {
    this.isLoading=false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getSelectedRoundDetails(selectyear:any,round:number){
    this.formulaOneService.getRoundDetails(selectyear,round).pipe(takeUntil(this.destroy$))
    .subscribe((data:any) => {
      console.log(data);
      this.race_results = data.MRData.RaceTable.Races[0];

      
      this.race_results.Results.forEach((ele: any) => {

        this.ELEMENT_DATA_1.push({
          Position :ele.position,
          Rank :ele.positionText,
          Points :ele.points,
          Driver :ele.Driver.givenName +' '+ele.Driver.familyName,
          Constructor: ele.Constructor.name,
          Time : ele.Time?ele.Time.time:''
  
        });
        this.driverDropDownArray.push({
          position :ele.position,
          dvrId :ele.Driver.driverId,
          dvrName :ele.Driver.givenName +' '+ele.Driver.familyName
        });
      });

      console.log(this.ELEMENT_DATA_1);
      
      this.dataSource =this.ELEMENT_DATA_1;
      
      console.log('>>>>>>>>>>>>>>dropdown',this.driverDropDownArray);
      
      this.isLoading=false;
    })
  }

  navigateHome(){
    this.router.navigate(['/home']);
  }

  changeSideNavColor(btn_ele: any){
    console.log(btn_ele);
    this.selectedSidenav = btn_ele;


    
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

