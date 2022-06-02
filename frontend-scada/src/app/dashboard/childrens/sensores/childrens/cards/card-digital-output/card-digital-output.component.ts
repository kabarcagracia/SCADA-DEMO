import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { DevicesService } from 'src/app/services/devices/devices.service'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card-digital-output',
  templateUrl: './card-digital-output.component.html',
  styleUrls: ['./card-digital-output.component.css']
})
export class CardDigitalOutputComponent implements OnInit {
  @Input() title: string = "[title]";
  @Input() data: boolean = false;
  @Input() idDevice: string = "";

  statusSensor: string = "--";
  statusBool: boolean = false;

  constructor(
    private devicesService: DevicesService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: any){
    if(!changes.data.firstChange){
      if(changes.data.currentValue){
        this.statusSensor = "ON";
        this.statusBool = true;
      } else {
        this.statusSensor = "OFF";
        this.statusBool = false;
      }
    }
    
  }
  onChecked(event: any){
    const checked = event.target.checked;
    this.devicesService.sendMessageDevice({status: checked, idDevice: this.idDevice})
    .then((response)=>{
      if(response.code !== 9 && this.statusSensor !== '--'){
        this.toastService.success("comando enviado exitosamente","");
      } else {
        this.toastService.error("dispositivo no conectado","Error");
      }
    }).catch((err)=>console.log(err));
    

  }

}
