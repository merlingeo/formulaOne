import { Component, Input, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Loader } from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule
  ],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
// const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

export class GoogleMapComponent {

  // @Input() data: any;
  // // @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;
  // mapOptions: google.maps.MapOptions = {
  //   center: { lat: 48.8588548, lng: 2.347035 },
  //   zoom: 13,
  //   mapTypeControl: false,
  //   mapId: "eaac1f85d5c5afed",
  // };

  // markers: MarkerProperties[] = [
  //   { position: { lat: 48.8584, lng: 2.2945 }}
  // ];

  // handleMapInitialized(map: google.maps.Map) {
  //   this.markers.forEach((marker: MarkerProperties) => {
  //     new google.maps.marker.AdvancedMarkerElement({
  //       position: marker.position,
  //       map,
  //     });
  //   });
  // ngOnInit(): void {

    // const position = { lat: -25.344, lng: 131.031 };
    // const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    //   zoom: 4,
    //   center: position,
    //   mapId: "eaac1f85d5c5afed", // Map ID is required for advanced markers.
    // });

    // const marker = new google.maps.marker.AdvancedMarkerElement({
    //   map,
    //   position: position,
    //   title: 'Uluru',
    // });
    ngOnInIt(){
      initMap();

      // let map: google.maps.Map;
      // const center = { lat: 41.90476224706472, lng: 12.49822074385094 };
      // const zoom = 14;

      // const loader = new Loader({
      //   apiKey: "AIzaSyChLYWOGaKiYld27y4YqrR5vzPepPEn-JA",
      //   version: "weekly",
      //   libraries: ["places"]
      // });

      // const mapOptions = {
      //   center: {
      //     lat: 0,
      //     lng: 0
      //   },
      //   zoom: 4
      // };

      // loader.load().then(async () => {
      //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      //   map = new Map(document.getElementById("map") as HTMLElement, {
      //     center: { lat: -24.397, lng: 150.644 },
      //     zoom: 8,
      //   });
      // });
  
    }
  }

  // let map;

async function initMap(): Promise<void> {
  // The location of Uluru
  const position = { lat: 48.8584, lng: 2.347035 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  // The map, centered at Uluru
  let map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 4,
      center: position,
      mapId: 'eaac1f85d5c5afed',
      // marker :marker
    }
  );
  // (mapDiv: HTMLElement, opts?: google.maps.MapOptions);
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'Uluru'
  });
  initMap();
}




