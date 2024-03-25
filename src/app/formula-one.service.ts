import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormulaOneService {

  private baseUrl = 'https://ergast.com/api/f1/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getAllRounds(id:any){

    return this.http.get(this.baseUrl + id+'.json').pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('something is wrong'))
      })
    );

  }

  getRoundDetails(year:number,round:number){
    return this.http.get(this.baseUrl + year+'/'+round+'/results.json').pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('something is wrong'))
      })
    );
  }

  getDriverLapsinPrix(year:String,round:string, dvrId: string){
    return this.http.get(this.baseUrl + year+'/'+round+'/drivers/'+dvrId+'/laps.json').pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('something is wrong'))
      })
    );
  }

  getallDriversPerformance(year:number,round:number){
    return this.http.get(this.baseUrl + year+'/'+round+'/laps.json?limit=500').pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('something is wrong'))
      })
    );
  }


}


