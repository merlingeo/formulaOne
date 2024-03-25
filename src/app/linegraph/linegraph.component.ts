import { Component,Input ,ElementRef, ViewChild, inject } from '@angular/core';

import { PlotlyModule } from 'angular-plotly.js';

import { Annotations, Data, Layout, PlotData, PlotType } from 'plotly.js-dist-min';
// import * as Plotly from 'plotly.js-dist';

// import * as Plotly from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min'
import { Subject, takeUntil } from 'rxjs';
import { FormulaOneService } from '../formula-one.service';

import {MatChipsModule,MatChipEditedEvent, MatChipInputEvent,} from '@angular/material/chips';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

PlotlyModule.plotlyjs = Plotly;
interface driver {
  position: number;
  dvrId: string;
  dvrName :string;
}
@Component({
  selector: 'app-linegraph',
  standalone: true,
  imports: [PlotlyModule,CommonModule,FormsModule,MatChipsModule,MatIconModule,MatButtonModule,MatProgressSpinnerModule,
    MatFormFieldModule, ReactiveFormsModule,MatSelectModule],
  templateUrl: './linegraph.component.html',
  styleUrl: './linegraph.component.scss'
})
export class LinegraphComponent {
  selectedValue: string | undefined;
  @Input()
  graphData!: any[];
  isLoading=true;
  driverOptions: driver[] = [
    
  // {position: '19', dvrId: 'haryanto', DvrName: 'Rio Haryanto'}

  ];

  dChips :driver[] =[
    // {position :1 , value: 'steak-0', viewValue: 'Steak'}
  ];
  newchip :any ;
  destroy$: Subject<boolean> = new Subject<boolean>();
  // graph_arr: any=[];
  xAxisArray: any[]=[];
  yAxisArray: any[]=[];
  driverObj: { [x: string]: { xData: any[]; yData: number[]; }; }
  | undefined
  graphObj: any[]=[];
  yearSelected!: number;
  roundSelected!: number ;

  

  constructor(private formulaOneService: FormulaOneService,private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.yearSelected = +params['year'];
      this.roundSelected = +params['round'];
      console.log(this.yearSelected);
      

      this.getDriverLapDetails(this.graphData[0].dvrId);
    })
    
    this.dChips.push(this.graphData[0]);
    this.driverOptions=this.graphData.slice(1);
  
  }

  testGraph(xvalues: any,yvalues: any){

    var trace1:Partial<PlotData> = {
      x: xvalues,
      y: yvalues,
      // x: [1, 2, 3, 4],
      // y: [10, 15, 13, 17],
      type: 'scatter',
      mode:'lines+markers',
      text: 'new tst',
      hoverinfo: 'text'
      
    };

    var trace2:Partial<PlotData> = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type : 'scatter',
      mode:'lines+markers',
      text: 'new tst',
      hoverinfo: 'text'
    };

    var data :Data[] = [trace1,trace2];

    const layout = {
      title: 'Line graph with custom hover names',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
    };


    Plotly.newPlot('myDiv', data,layout);
  }

  getDriverLapDetails(dvrId: string) {
    console.warn('whos calin!!!!!!!!!!');
    let graph_arr:any[]=[];
    this.formulaOneService.getDriverLapsinPrix(this.yearSelected.toString(),this.roundSelected.toString(),dvrId).pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        data.MRData.RaceTable?.Races[0]?.Laps.map((ele: { number: any; Timings: { time: any; }[]; }) => {
          graph_arr.push({ lap: ele.number,
                           passingtime: ele.Timings[0].time })
        })


        let xData = graph_arr.map((ele: { lap: any; })=>ele.lap)
        // console.log(xData);
        this.xAxisArray.push(xData);
        let yData = graph_arr.map((ele: { passingtime: string; })=>this.gettimeTomilli(ele.passingtime));
        this.yAxisArray.push(yData);

        this.driverObj = { [dvrId]: {xData,yData} };
        console.log('graphObj,>>>>>>>',this.driverObj);

        this.graphObj.push(this.driverObj);
        // let driverLabels =Object.keys( this.graphObj)     
        // console.log(' this.yAxisArray', this.yAxisArray);
  
        // this.testGraph(xData,yData);

        // this.createGraph(this.xAxisArray, this.yAxisArray);
        this.createGraph(this.graphObj);
      })

  
          
  }


  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  gettimeTomilli(timeString: string) {
    const [minutes, seconds, milliseconds] = timeString.split(/[.:]/);
    const totalMilliseconds = (parseInt(minutes, 10) * 60 + parseInt(seconds, 10)) * 1000 + parseInt(milliseconds, 10);
    return totalMilliseconds/1000;
  }


  createGraph(graphObj: any) {
    console.log('final graph object details............>>',graphObj);
    
    let driverLabels:any[] =[];
    graphObj.forEach((element: {}) => {
      driverLabels.push(...Object.keys(element))
    });
    var xData: any[]=[];
    var yData: any[] = [];
    // graphObj[0].rosberg
    // let xData = graph_arr.map((ele: { lap: any; })=>ele.lap)
    graphObj.forEach((element: { [x: string]: any; },index: number) => {
         console.log(element[driverLabels[index]].xData);
         
      xData.push(element[driverLabels[index]].xData)
      yData.push(element[driverLabels[index]].yData)
    });

    // var plotingPoints :any= Object.values(graphObj[0])[0];
    // var yD=Object.values(graphObj[0])[1];

    
    // var xData = [
    //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
    //   ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
      // [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
      // [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
      // [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
      // [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
      // [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]
    // ];

    // var yData = [
    //   [121.628, 111.375, 110.25, 138.361, 158.864, 129.49, 108.572, 109.31, 109.255, 109.98, 108.813, 109.204, 109.246, 109.523, 109.511, 108.996, 108.46, 108.533, 108.588, 108.606, 129.704],
    //   [109.255, 109.98, 108.813, 109.204, 109.246, 109.523, 109.511, 108.996, 108.46, 108.533, 108.588, 108.606, 129.704]
      // [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
      // [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
      // [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23],
      // [24, 54, 10, 74, 40, 14, 54, 11, 30, 21, 43, 30],
      // [12, 45, 23, 45, 25, 27, 52, 17, 63, 32, 74, 53]


    // ];

    var colors = [
    ];

    var lineSize = [];

    // var labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

    var data: Data[] = [];
    // let xData=plotingPoints.xData;
    // let yData=plotingPoints.yData;
    for (var i = 0; i < xData.length; i++) {
      var result: Partial<PlotData> = {
        x: xData[i],
        y: yData[i],
        type: 'scatter',
        mode: 'lines',
        text:driverLabels[i],
        name:driverLabels[i],
        line: {
          // color: this.getRandomColor(),
          // width: lineSize[i]
        }
      };
     
      data.push(result);
    }


    var layout: Partial<Layout> = {
      showlegend: true,
      // height: 500,
      // width: 500,
      legend:{
        font:{
          size: 8
        }
      },
      xaxis: {
        showline: true,
        showgrid: false,
        showticklabels: true,
        linecolor: 'rgb(204,204,204)',
        // linewidth: 2,
        autotick: true,
        ticks: 'outside',
        tickcolor: 'rgb(204,204,204)',
        // tickwidth: 2,
        // ticklen: 5,
        tickfont: {
          family: 'Arial',
          size: 12,
          color: 'rgb(82, 82, 82)'
        }
      },
      yaxis: {
        showgrid: false,
        linecolor: 'rgb(204,204,204)',
        zeroline: false,
        showline: false,
        showticklabels: false,
        // tickcolor: 'rgb(204,204,204)',
      },
      autosize: true,
      margin: {
        l: 100,
        r: 20,
        t: 100
      },
      annotations: [
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.0,
          y: 1.05,
          xanchor: 'left',
          yanchor: 'bottom',
          text: 'Main Source for News',
          font: {
            family: 'Arial',
            size: 30,
            color: 'rgb(37,37,37)'
          },
          showarrow: false
        },
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.5,
          y: -0.1,
          xanchor: 'center',
          yanchor: 'top',
          text: 'Source: Pew Research Center & Storytelling with data',
          showarrow: false,
          font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(150,150,150)'
          }
        }
      ]
    };


    // for (var i = 0; i < xData.length; i++) {
    //   var result3: Partial<Annotations> = {
    //     xref: 'paper',
    //     x: 0,
    //     y: yData[i][0],
    //     xanchor: 'right',
    //     yanchor: 'auto',
    //     // text: labels[i],
    //     showarrow: false,
    //     font: {
    //       family: 'Arial',
    //       size: 10,
    //       color: 'black'
    //     }
    //   };
    //   var result4: Partial<Annotations> = {
    //     xref: 'paper',
    //     x: 0.95,
    //     y: yData[i][11],
    //     xanchor: 'left',
    //     yanchor: 'middle',
    //     text: 'winner',
    //     font: {
    //       family: 'Arial',
    //       size: 10,
    //       color: 'black'
    //     },
    //     showarrow: false
    //   };

      // layout.annotations?.push(result3, result4)
    // }
    Plotly.newPlot('myDiv', data, layout);
    this.isLoading=false;
  }


  removeChip(evnt:any){

    console.log(evnt.value );
    console.log('test succes');
    this.dChips = this.dChips.filter(ele => ele !== evnt);
    console.log(this.dChips);
    
    // this.driverOptions.push(evnt);
    this.driverOptions.splice(evnt.position-1, 0, evnt);
    this.selectedValue = '';
    // Object.keys()
    this.graphObj= this.graphObj.filter(item => Object.keys(item)[0] !== evnt.dvrId);

      this.createGraph(this.graphObj);
  }

  addChip(event: MatSelectChange): void {
    const index = event.source._valueId;
    console.log('Selected index:', index);


    this.getDriverLapDetails(event.value);



    console.log('Selected value:', event.value);
    // You can perform any actions with the selected value here
    console.log( );
    this.newchip = this.driverOptions.find(item => item.dvrId === event.value);
    this.dChips.push(this.newchip);
    console.log(this.newchip);
    
    this.driverOptions = this.driverOptions.filter(driver => driver.dvrId !== event.value);
  }

  ngOnDestroy() {
    this.isLoading=false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
