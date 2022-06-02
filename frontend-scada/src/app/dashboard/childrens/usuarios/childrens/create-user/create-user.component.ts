import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formCreateUser: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private toastr: ToastrService,
    private router: Router
  ){ 
    
    this.formCreateUser = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
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
        Validators.required,
        this.rutValidator
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required
      ]),
      
    });
  }

  ngOnInit(): void {
  }

  rptPwd(formControl: any){
    const value = formControl.value;
    console.log();
    
    if(true){
      return null;
    } else {
      return { rptPwdValidator: { err: "las contraseñas no coinciden." }};
    }
  }
  formError(form: string): string {
    const test = this.formCreateUser.controls[form].errors;
    console.log(test);

    if(test?.['required']) {
      return "[*] Campo obligatorio.";
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
    const test = this.formCreateUser.controls[form];
    if(test.valid && !test.untouched) return true;
    return false;
    
  }
  formInvalid(form: string):boolean{
    const test = this.formCreateUser.controls[form];
    if(test.invalid && !test.untouched) return true;
    return false;
  }
  telefonoValidator(formControl: any) {
    const value = formControl.value;
    console.log(value);
    
    if(value.startsWith('+569')){
      return null;
    } else {
      return { telefonoValidator: { err: "Los numeros moviles deben comenzar con 9." }};
    }
  }
  rutValidator(formControl: any) {
    const value = formControl.value;
    if(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/.test(value)) {
      return null;
    } else {
      return { rutValidator: { err: "error" }};
    }     
  }

  

  onSubmit(){
    console.log(this.formCreateUser);
    this.usuariosService.create(this.formCreateUser.value)
    .then((response) => {
      this.toastr.success('Se ha creado el usuario ' + response.newUser + 'exitosamente.', 'Creación exitosa');
      this.router.navigate(['/dashboard/usuarios']);
    })
    .catch((err) => {
      if(err.error.keyPattern?.email) {
        this.toastr.error('el correo ya existe.', 'Creación Fallida');
      }
      else if(err.error.keyPattern?.rut) {
        this.toastr.error('el rut ya existe.', 'Creación Fallida');
      }
      else {
        this.toastr.error('error interno.', 'Creación Fallida');
        console.log(err);
      }      
    });

    
  }

}

