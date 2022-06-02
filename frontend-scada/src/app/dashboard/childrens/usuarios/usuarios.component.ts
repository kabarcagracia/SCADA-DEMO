import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
  statusModal: boolean;
  idUser: string;
  nameUser: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: Usuario[];
  constructor(
    private httpClient: HttpClient,
    private usuariosService: UsuariosService,
    private toast: ToastrService
  ){
    this.usuarios = [];
    this.statusModal = false;
    this.idUser = "";
    this.nameUser = "";

   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
    this.usuariosService.read()
    .then((response) =>{
      console.log(response);
      this.usuarios = response;

      this.dtTrigger.next();
      
    })
    .catch((err) => console.log(err));
  }

  deleteUser(user: any) {
    this.idUser = user._id;
    this.nameUser = user.name + " " + user.lastnames;
    this.statusModal= true;
    
  
  }

  eliminar(id2: any){

    console.log(typeof(id2), id2);
    let id = id2;
    this.usuariosService.delete(id)
    .then((response) => {
      if(response.response.deletedCount == 1) {
        this.toast.success('El usuario ' + this.nameUser +  ', se ha eliminado correctamente.', 'Usuario Eliminado');
      } else {
        this.toast.warning('El usuario ' + this.nameUser +  ', ya ha sido eliminado.', 'Usuario Eliminado');
      }
    }).catch((err) => { console.log(err);
    });

    this.statusModal = false;

  }
  closeModal(){
    this.statusModal=false;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
