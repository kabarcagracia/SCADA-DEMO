import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css']
})
export class DispositivosComponent implements OnInit {
  dispositivos: any = [];
  idMaquina: string;
  statusLoading: boolean = true;
  statusDevices: boolean = false;
  cantidadSensores: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private devicesServices: DevicesService,
    private toastrService: ToastrService
  ) {
    this.idMaquina = "";
    this.activatedRoute.params.subscribe( params =>{
      console.log(params);
      this.idMaquina = params.maquinaId;
    });
  }

  ngOnInit(): void {

    this.devicesServices.read(this.idMaquina)
    .then((response) =>{
      console.log(response);
      this.statusLoading = false;
      if(response.devices.length > 0){
        this.statusDevices = true;
        this.dispositivos = response.devices;
        
        for(let i = 0; i < response.devices.length; i++){
          let anlin = 0;
          let digin = 0;
          let digout = 0;
          for(let j = 0; j < response.devices[i].sensors.length; j++){
            console.log(response.devices[i].sensors[j]);

            if(response.devices[i].sensors[j].typeSensor == 'ai'){
              anlin++;
            } else if(response.devices[i].sensors[j].typeSensor == 'di'){
              digin++;
            } else if(response.devices[i].sensors[j].typeSensor == 'do'){
              digout++;
            }
          }
          this.cantidadSensores.push({ai: anlin, di: digin, do: digout});
          
        }
        
        this.toastrService.success(response.devices.length + " dispositivo(s) recuperado(s) exitosamente.", "");
      } else {
        this.statusDevices = false;
      }
    }).catch((err) =>{ 
      console.log(err);
      this.toastrService.error("No se pudo procesar la petición.", "Error Interno");
    });
  }

}
