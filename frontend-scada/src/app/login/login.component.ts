import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;
  estadoAuth: boolean;
  
  constructor( 
    private loginService: LoginService, 
    private toastr: ToastrService,
    private router: Router
  ){ 
    this.estadoAuth = false;
    this.formLogin = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
        ]),
        password: new FormControl('', [
            Validators.required,
        ])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.estadoAuth = true;
    
    this.loginService.signin(this.formLogin.value)
    .then((response) => {
        this.estadoAuth = false;
        this.toastr.success(response.msg, 'Autenticación Correcta');

        //guardar token en localstorage
        if(localStorage.getItem('access-token')) {
            localStorage.removeItem('access-token');
            localStorage.setItem('access-token', response.token);
            
        } else {
            localStorage.setItem('access-token', response.token);
        }
        this.router.navigate(['/dashboard']);
        
    })
    .catch((err) => {
        this.estadoAuth = false;

        if(err.status == 401) {
          console.log(err.error.msg);
          
            this.toastr.error(err.error.msg, 'Autenticación Erronea');
        } else {
            this.toastr.error("El servidor no se encuentra disponible", 'Error Interno');
        } 

        
        console.log(err);
    }
    
    
    );       
  }

  formError(form: string): string {
    const test = this.formLogin.controls[form].errors;
    console.log(test);

    if(test?.['required']) {
      return "este campo es obligatorio.";
    }
    if(test?.['minlength']){
      return "el minimo de caracteres es 3.";
    }
    if(test?.['pattern']){
      return "correo electrónico no valido.";
    }
    if(test?.['lengthPhoneValidator']){
      return "numero no valido. ej: +56987654321";
    }

    return "error desconocido";
    
  }

  formValid(form: string):boolean{
    const test = this.formLogin.controls[form];
    if(test.valid && !test.untouched) return true;
    return false;
    
  }
  formInvalid(form: string):boolean{
    const test = this.formLogin.controls[form];
    if(test.invalid && !test.untouched) return true;
    return false;
  }

}
