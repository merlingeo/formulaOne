import { Routes } from '@angular/router';
import { PrixhomeComponent } from './prixhome/prixhome.component';
import { HomeComponent } from './home/home.component';
import { LinegraphComponent } from './linegraph/linegraph.component';
import { GoogleMapComponent } from './google-map/google-map.component';


export const routes: Routes = [
    { path: 'prixhome', component: PrixhomeComponent },
    { path: 'home', component: HomeComponent },
    // { path: '*', component: HomeComponent }
    { path: 'line', component: LinegraphComponent },
    { path: 'map', component: GoogleMapComponent }
    
    
    
];
