import { Component, OnInit } from '@angular/core';
import { MachinesService } from 'src/app/services/machines/machines.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {
  
  maquinas: any = [];
  statusMaquinas: boolean = false;
  statusLoading: boolean = true;

  constructor(
    private machinesService: MachinesService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.machinesService.read()
    .then((response) => {
      console.log(response);
      
      this.statusLoading = false;
      if(response.length > 0) {
        this.toastrService.success(response.length + " maquina(s) recuperada(s) exitosamente.", "");
        this.statusMaquinas = true;
        this.maquinas = response;
      } else {
        this.statusMaquinas = false;
      }
    }).catch((err) =>{
      console.log(err);
      this.toastrService.error("No se pudo procesar la petición.", "Error Interno");
    });
  }

}
