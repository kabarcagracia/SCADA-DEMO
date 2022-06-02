import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  formEditUser: FormGroup;
  usuario: string;
  editUser: any;
  precio: number = 198.17;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { 
    this.usuario = "";
    this.editUser = [];
    this.formEditUser = new FormGroup({
      name: new FormControl(null),
      lastnames: new FormControl(null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ]),
      birth: new FormControl(null, [
        Validators.required
      ]
      ),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]+/)
      ]),
      rut: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
       
      ]),
      repeatPassword: new FormControl(null, [
        
      ]),
    });
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params =>{
      console.log(params);
      this.usuario = params.usuarioId;

      this.usuariosService.readOneUser(params.usuarioId).then((response)=>{
        this.editUser = response;
        console.log(response);
        
      }).catch((err)=>{ console.log(err);
      });
    });
  }

}
