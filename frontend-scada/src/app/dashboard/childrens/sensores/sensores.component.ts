/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { WebsocketService } from '../../../services/websocket/websocket.service';
import { SensorsService } from 'src/app/services/sensors/sensors.service';
import { ToastrService } from 'ngx-toastr';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexDataLabels,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  dataLabels: ApexDataLabels;
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})


export class SensoresComponent implements OnInit {
  idDevice: string = "";
  idMachine: string = "";
  nameDevice: string = "";
  dataDevice: any = {};
  orderSensors: any[] = [];
  signalConfig: any = {
    name: "[NAME]",
    icon: "[ICON]",
    var: "[variable]"
  };
  sensores: any[] = [];
  dataSensores: any[] = [];
  //getIdDevice
  //typeSensors
  //Get 30 last data
  //create Conexion xdxd
  //funciona esta mierda






  dataSocket: any = {
    data: {
      temp: 0,
      wifi: 0,
      battery: 0,
      carbon_dioxide: 0
    }
  };
  titulo: any = "sd";
  i: number = 20;
  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild('divMap') divMap!: ElementRef;

  mapa!: google.maps.Map;



  public chartOptions: Partial<ChartOptions> | any;
  constructor(
    private service: WebsocketService,
    private sensorsService: SensorsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.idDevice = params.dispositivoId;
      this.idMachine = params.maquinaId;
    });
    this.sensorsService.readSensors({idDevice: this.idDevice, idMachine: this.idMachine})
    .then((response) => {
      console.log("START", response);
      
      this.dataDevice = response;
      this.nameDevice = response.devices[0].idDevice;
      
      this.sensores = this.dataDevice.devices[0].sensors;
      if(this.sensores.length > 0) {
        for(let item of this.sensores){
          let typeSensor = item.typeSensor;
          if(typeSensor == 'ai'){
            this.orderSensors.unshift(item);
          } else if(typeSensor == 'di' || typeSensor == 'do'){
            this.orderSensors.push(item);
          }
          
          
        }
        this.toastr.success(this.sensores.length + " sensores disponibles", "Recuperación Exitosa");
      } else {
        this.toastr.success("No hay sensores disponibles", "Recuperación Exitosa");
      }
      this.orderSensors.unshift({
        typeSensor: 'dp',
        nameDevice: response.devices[0].nameDevice,
        idDevice: response.devices[0].idDevice,
        description: response.devices[0].description,
        location: response.devices[0].location
      });

      console.log(this.orderSensors);
      
      //console.log(this.sensores);
      this.toastr.info(this.nameDevice,"Estableciendo Conexión WS");
      this.service.getMessage(this.nameDevice)
      .subscribe((msg: any) => {
        //console.log(msg);
        this.dataSocket = msg;

        //console.log(this.dataSocket);
        
        
      });
      
      
    })
    .catch((err) => console.log(err));

    /*this.sensorsService.readLastData({nameDevice: "testDevice"})
    .then((response) => {
      //console.log(response);
      this.dataSensores = response;
      console.log(this.dataSensores);
      
    })
    .catch((err) => console.log(err));*/







    this.chartOptions = {
      series: [this.i],
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 3000,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      }
      },
      dataLabels:{
        enabled:false
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val:any) {
                return val + "%";
              }
            }
          }
        }
      },
      
      fill: {
        type: "gradient",
        colors: [function(obj:any) {
          if(obj.value < 55) {
              return '#7E36AF'
          } else if (obj.value >= 55 && obj.value < 80) {
              return '#164666'
          } else {
              return '#D9534F'
          }
        }],
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["Median Ratio"],
      responsive: [{
        breakpoint: undefined,
        options: {},
    }]
    };

    
  }
  
  ngOnInit(){
    



    
  }
  ngAfterViewInit(){
    //this.cargarMapa();
  }
  /*cargarMapa(){
    const opciones = {
      center: new google.maps.LatLng(-33.45568,-70.465456),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }

    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);
    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter()
    });
    markerPosition.setMap(this.mapa);
  }*/
}
