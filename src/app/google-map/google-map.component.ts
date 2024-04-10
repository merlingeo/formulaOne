import { Component, Input, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
// const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

export class GoogleMapComponent  {

  @Input() circuitInfo: any;
  @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;
  
  
  mapOptions: google.maps.MapOptions = {
    center: { lat:0, lng: 0 },
    zoom: 13,
  };

  
  handleMapInitialized(map: google.maps.Map) {

    console.log(this.circuitInfo);
    // this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.marker.AdvancedMarkerElement({
        position:this.circuitInfo[0],
        map,
      });
    // });

  };
}


interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};