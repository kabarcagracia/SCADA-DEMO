/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ElementRef, ViewChild,Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track-route',
  templateUrl: './track-route.component.html',
  styleUrls: ['./track-route.component.css']
})
export class TrackRouteComponent implements OnInit {
  @Input() lat: number = -33.45568;
  @Input() lng: number = -70.46546;

  @ViewChild('divMap') divMap!: ElementRef;
  mapa!: google.maps.Map;

  polilinea: any[] = [];

  initMap(){
    
    const opciones = {
      center: new google.maps.LatLng(-34.4028433,-70.8608394),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);

    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];
    
  }
  constructor() { }
  ngAfterViewInit(){
    this.initMap();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any){
    console.log(changes);
    
    if(!changes.lat.firstChange){
      let latAdd = changes.lat.currentValue;
      let lngAdd = changes.lng.currentValue;
  
  
      this.polilinea.push({lat: latAdd, lng: lngAdd});
      let flightPath = new google.maps.Polyline({
        path: this.polilinea,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
    
      flightPath.setMap(this.mapa);
  
      console.log(this.polilinea);
    }
   
    


  }

}
