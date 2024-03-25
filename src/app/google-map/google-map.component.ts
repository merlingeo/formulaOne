import { Component, Input, ViewChild } from '@angular/core';
// import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  standalone: true,
  // imports: [GoogleMapsModule
  // ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
// const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

export class GoogleMapComponent  {

  // @Input() circuitInfo: any;
  // @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;
  
  // mapOptions: google.maps.MapOptions = {
  //   center: { lat: 48.8588548, lng: 2.347035 },
  //   zoom: 13,
  // };

  // markers: MarkerProperties[] = [
  //   { position: { lat: 48.8584, lng: 2.2945 }},
  // ];
  // handleMapInitialized(map: google.maps.Map) {
  //   this.markers.forEach((marker: MarkerProperties) => {
  //     new google.maps.marker.AdvancedMarkerElement({
  //       position: marker.position,
  //       map,
  //     });
  //   });

  // }
  // ;
}


// interface MarkerProperties {
//   position: {
//     lat: number;
//     lng: number;
//   }
// };