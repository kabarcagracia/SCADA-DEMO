/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { WebsocketService } from '../../../services/websocket/websocket.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {
  idMachine: string = "";
  nameDevice: string = "";
  idDevice: string = "";
  description: string = "";

  dataSocket: any = {
    data: {
      temp: 0,
      signal: 0,
      battery: 0,
      carbon_dioxide: 0
    }
  };
  @ViewChild('divMap') divMap!: ElementRef;

  mapa!: google.maps.Map;
  constructor(
    private service: WebsocketService,
    private sensors: SensorsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.activatedRoute.params.subscribe( params => {
      this.idMachine = params.maquinaId;

    });
  }

  ngOnInit(): void {
    this.sensors.readGps({idMachine: this.idMachine})
    .then((response) => {
      console.log("primer consola");
      
      console.log(response.trackerData);
      
      this.nameDevice = response.trackerData.nameDevice;
      this.idDevice = response.trackerData.idDevice;
      this.description = response.trackerData.description;
      this.toastr.info(this.idDevice,"Estableciendo Conexión WS");

      this.service.getMessage(this.idDevice)
      .subscribe((msg: any) => {
        console.log(msg);
        this.dataSocket = msg;

        //console.log(this.dataSocket); 
      });
    }).catch((err) =>{

      console.log(err);
      
    })
    
    
  }
  

}