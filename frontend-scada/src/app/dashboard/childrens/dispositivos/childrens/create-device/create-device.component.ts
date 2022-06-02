import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent implements OnInit {
  formCreateDevice: FormGroup;
  idMaquina: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private devicesServices: DevicesService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.idMaquina = "";

    this.activatedRoute.params.subscribe( params =>{
      console.log(params);
      this.idMaquina = params.maquinaId;
    });

    this.formCreateDevice = new FormGroup({
      idMachine: new FormControl(this.idMaquina, [
        Validators.required
      ]),
      data: new FormGroup({
        nameDevice: new FormControl(null, [
          Validators.required
        ]),
        idDevice: new FormControl(null, [
          Validators.required
        ]),
        description: new FormControl(null, [
          Validators.maxLength(25)
        ]),
        location: new FormGroup({
          lat: new FormControl(null, [
            Validators.required
          ]),
          lng: new FormControl(null, [
            Validators.required
          ])
        })
      })
    });
  }

  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log(this.formCreateDevice.value);
    
    this.devicesServices.create(this.formCreateDevice.value)
    .then((response) => {
      console.log(response);
      this.toastr.success("se creo exitosamente.","Dispositivo Creado");
      this.router.navigate(['/dashboard/dispositivos/' + this.idMaquina]);
    }).catch((err) =>{
      console.log(err);
      this.toastr.error("creación fallida.", "Error Interno");
    });
  }
  onPosition(event: any){
    this.formCreateDevice.patchValue({
      data: {
        location: {
          lat: Number(event.lat()).toFixed(7),
          lng: Number(event.lng()).toFixed(7)
        }
      }
    });
  }
}
