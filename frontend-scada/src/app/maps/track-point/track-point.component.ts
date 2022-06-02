/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-track-point',
  templateUrl: './track-point.component.html',
  styleUrls: ['./track-point.component.css']
})
export class TrackPointComponent implements OnInit {
  @Input() lat: number = -33.45568;
  @Input() lng: number = -70.46546;

  @ViewChild('divMap') divMap!: ElementRef;
  mapa!: google.maps.Map;
  markers!: google.maps.Marker[];

  initMap(){
    
    const opciones = {
      center: new google.maps.LatLng(-34.4028433,-70.8608394),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);
  }
  constructor() { this.markers= [];}

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initMap();
  }
  ngOnChanges(changes: any){
    
    const marker = new google.maps.Marker({
      position: { lat: changes.lat.currentValue, lng: changes.lng.currentValue}
    });  
    this.borrarMarcadores();
    //marker.setDraggable(true);    
    marker.setMap(this.mapa);
  }
  borrarMarcadores(){
    for(let marker of this.markers){
      marker.setMap(null);
    }
  }


}


