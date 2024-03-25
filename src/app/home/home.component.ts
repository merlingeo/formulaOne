import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { default as _rollupMoment, Moment } from 'moment';
import { MatInputModule } from '@angular/material/input';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormulaOneService } from '../formula-one.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatSelectModule
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

  constructor(private formulaOneService: FormulaOneService,
              private router: Router) { }

  maxDate: Date = new Date(2024, 11, 31);
  date = new FormControl(moment());
  raceRound = new FormControl('');

  destroy$: Subject<boolean> = new Subject<boolean>();
  results: any = [];
  optionDict: { round: string, raceName: any }[] = [];
  selectedOption: string = '';

  setF1Year(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.selectedOption = '';
    this.optionDict = [];
    this.getResultsByDate(this.date.value?.year());
  }

  ngOnInit(): void {
    this.getResultsByDate(this.date.value?.year());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit() {

    // Form is valid, perform form submission logic here
    console.log('Form submitted!', this.raceRound.value, this.date.value?.year());
    // this.router.navigate(['/prixhome'], { queryParams: { year: 2003, round: 2 } });
    this.router.navigate(['/prixhome'], { queryParams: { year: this.date.value?.year(), round: this.raceRound.value } });
  }



  getResultsByDate(selectyear?: number) {
    this.formulaOneService.getAllRounds(selectyear).pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {

        //  console.log(data.MRData.RaceTable.Races);
        this.results = data.MRData.RaceTable.Races;
        this.results.forEach((ele: any) => {
          this.optionDict.push({ round: ele.round, raceName: ele.raceName });
        });
        console.log(this.optionDict);
      });
  }

  
}
