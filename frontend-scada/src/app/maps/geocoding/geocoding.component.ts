/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent implements OnInit {
  @ViewChild('divMap') divMap!: ElementRef;
  mapa!: google.maps.Map;
  markers: google.maps.Marker[];

  @Output() position: EventEmitter<Object>;
  initMap(){
    
    const opciones = {
      center: new google.maps.LatLng(-33.45568,-70.465456),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);
    /*const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter()
    });
    markerPosition.setMap(this.mapa);*/

    google.maps.event.addListener(this.mapa, 'click', (event: google.maps.MouseEvent) =>{
      console.log(event);
     
      const marker = new google.maps.Marker({
        position: event.latLng,
        animation: google.maps.Animation.DROP
      });  
      this.borrarMarcadores();
      //marker.setDraggable(true);    
      marker.setMap(this.mapa);
      this.position.emit(event.latLng);
      this.markers.push(marker);
      this.mapa.setCenter(event.latLng);

      google.maps.event.addListener(marker, 'mouseover', event =>{
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
      google.maps.event.addListener(marker, 'mouseout', event =>{
        marker.setAnimation(null);
      });

    });
    
  }
  borrarMarcadores(){
    for(let marker of this.markers){
      marker.setMap(null);
    }
  }
  
  constructor() {
    this.markers= [];
    this.position = new EventEmitter();
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initMap();
  }
  

}
