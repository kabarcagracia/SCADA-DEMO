import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../../services/machines/machines.service'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  lengthMachines: number = 0;
  lengthDevices: number = 0;
  lengthSensors: number = 0;
  lengthUsers: number = 0;
  statusLoading: boolean = true;
  constructor(
    private machinesService: MachinesService
  ) { }

  ngOnInit(): void {
    this.machinesService.getInfo()
    .then((response) => {
      console.log(response);
      this.lengthMachines = response.machines;
      this.lengthDevices = response.devices;
      this.lengthSensors = response.sensors;
      this.lengthUsers = response.users;

      this.statusLoading= false;
    }).catch((err)=>{
      console.log(err);
      
    })
  }

}
