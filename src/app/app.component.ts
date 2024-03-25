import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

// mat imports
import {MatCardModule} from '@angular/material/card';
import {MatDatepicker,MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})




export class AppComponent {
  title = 'f1DataApp';

  constructor(private router: Router) { }
  ngOnInit(): void {
  
    this.router.navigate(['/home']);
  }
}

    // this.formulaOneService.getDriverLapsinPrix().pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     data.MRData.RaceTable.Races[0].Laps.map((ele: { number: any; Timings: { time: any; }[]; })=>{
    //       this.graph_arr.push({lap :ele.number, passingtime :ele.Timings[0].time})
    //     })

    //     console.log(this.graph_arr);

    //   })